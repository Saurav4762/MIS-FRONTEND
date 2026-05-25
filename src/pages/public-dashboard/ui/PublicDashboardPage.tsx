import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { publicDashboardApi, type MunicipalityInfo } from "../api/public-dashboard.api";
import type { DashboardStats } from "@pages/dashboard/model/types";
import { GenderPieChart } from "@pages/dashboard/ui/GenderPieChart";

type Ward = {
    id: string;
    number: number;
    representativeNameEn: string;
};

type Props = {
    municipalityId: string;
};

export function PublicDashboardPage({ municipalityId }: Props) {
    const navigate = useNavigate();
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [wards, setWards] = useState<Ward[]>([]);
    const [municipality, setMunicipality] = useState<MunicipalityInfo | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        publicDashboardApi.getStats(municipalityId, selectedWard)
            .then(res => setData(res.data))
            .catch(() => setError("Failed to load data"))
            .finally(() => setLoading(false));
    }, [municipalityId, selectedWard]);

    useEffect(() => {
        publicDashboardApi.getWards(municipalityId)
            .then(res => setWards(Array.isArray(res) ? res : res.data ?? []))
            .catch(() => {});

        publicDashboardApi.getMunicipality(municipalityId)
            .then(res => setMunicipality(res))
            .catch(() => {});
    }, [municipalityId]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-gray-600 text-lg">Loading...</p>
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-red-500">{error || "No data available"}</p>
        </div>
    );

    const municipalityName = municipality?.nameEn ?? "Municipality";

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-sm">
                        BM
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">{municipalityName}</h1>
                        <p className="text-xs text-gray-500">Municipality Information System</p>
                    </div>
                </div>

                {/* Ward Filter */}
                <select
                    className="bg-white border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    value={selectedWard ?? "all"}
                    onChange={(e) => setSelectedWard(e.target.value === "all" ? undefined : e.target.value)}
                >
                    <option value="all">सबै वडा (All Wards)</option>
                    {wards.map((w) => (
                        <option key={w.id} value={w.id}>
                            वडा {w.number} - {w.representativeNameEn}
                        </option>
                    ))}
                </select>

                {/* Login Button */}
                <button
                    onClick={() => navigate({ to: "/Login" })}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    Sign In
                </button>
            </header>

            {/* Main Content */}
            <main className="px-8 py-6 space-y-6">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox label="कुल जनसंख्या" value={data.totalPopulation} color="blue" />
                    <StatBox label="कुल घर संख्या" value={data.totalHouseholds} color="purple" />
                    <StatBox label="साक्षर" value={data.literate} color="green" />
                    <StatBox label="१६+ उमेर" value={data.ageGroup16Plus} color="yellow" />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">लिङ्ग अनुसार जनसंख्या</h3>
                        <div className="space-y-3">
                            <GenderRow label="पुरुष" value={data.populationByGender.male} total={data.totalPopulation} color="bg-blue-500" />
                            <GenderRow label="महिला" value={data.populationByGender.female} total={data.totalPopulation} color="bg-pink-500" />
                            <GenderRow label="अन्य" value={data.populationByGender.others} total={data.totalPopulation} color="bg-purple-500" />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">जनसंख्या विवरण</h3>
                        <GenderPieChart data={data.populationByGender} />
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
    const colors: Record<string, string> = {
        blue: "border-blue-200 text-blue-600 bg-blue-50",
        purple: "border-purple-200 text-purple-600 bg-purple-50",
        green: "border-green-200 text-green-600 bg-green-50",
        yellow: "border-yellow-200 text-yellow-600 bg-yellow-50",
    };
    return (
        <div className={`border rounded-xl p-5 ${colors[color]}`}>
            <p className="text-gray-500 text-sm mb-2">{label}</p>
            <p className="text-3xl font-bold">
                {value.toLocaleString()}
            </p>
        </div>
    );
}

function GenderRow({ label, value, total, color }: {
    label: string; value: number; total: number; color: string;
}) {
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
    return (
        <div>
            <div className="flex justify-between text-sm mb-1 text-gray-700">
                <span>{label}</span>
                <span>{value.toLocaleString()} ({pct}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}