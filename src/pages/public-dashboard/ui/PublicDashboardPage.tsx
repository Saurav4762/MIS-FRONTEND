import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { publicDashboardApi } from "../api/public-dashboard.api";
import type { DashboardStats } from "@pages/dashboard/model/types";
import { GenderPieChart } from "@pages/dashboard/ui/GenderPieChart";

type Ward = {
    id: string;
    number: number;
    representativeNameEn: string;
    email: string;
    phoneNo: string;
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
            .then(res => {
                console.log('Wards:', res); // debug
                setWards(Array.isArray(res) ? res : []);
            })
            .catch((err) => console.error('Ward error:', err));
    }, [municipalityId]);

    if (loading) return (
        <div className="min-h-screen bg-[#020816] flex items-center justify-center">
            <p className="text-white text-lg">Loading...</p>
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen bg-[#020816] flex items-center justify-center">
            <p className="text-red-400">{error || "No data available"}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020816] text-white">

            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                        BM
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Bhadrapur MIS</h1>
                        <p className="text-xs text-gray-400">Municipality Information System</p>
                    </div>
                </div>

                {/* Ward Filter */}
                <select
                    className="bg-[#0f1729] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
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
                    onClick={() => {
                        localStorage.removeItem("accessToken"); // clear token first
                        navigate({ to: "/login" });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    Sign In
                </button>
            </header>

            {/* Main Content */}
            <main className="px-8 py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                    <p className="text-sm text-gray-400">
                        {selectedWard ? `वडा ${wards.find(w => w.id === selectedWard)?.number}` : "सबै वडा"}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox label="कुल जनसंख्या" value={data.totalPopulation} color="blue" />
                    <StatBox label="कुल घर संख्या" value={data.totalHouseholds} color="purple" />
                    <StatBox label="साक्षर" value={data.literate} color="green" />
                    <StatBox label="१६+ उमेर" value={data.ageGroup16Plus} color="yellow" />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0f1729] border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">लिङ्ग अनुसार जनसंख्या</h3>
                        <div className="space-y-3">
                            <GenderRow label="पुरुष" value={data.populationByGender.male} total={data.totalPopulation} color="bg-blue-500" />
                            <GenderRow label="महिला" value={data.populationByGender.female} total={data.totalPopulation} color="bg-pink-500" />
                            <GenderRow label="अन्य" value={data.populationByGender.others} total={data.totalPopulation} color="bg-purple-500" />
                        </div>
                    </div>

                    <div className="bg-[#0f1729] border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">जनसंख्या विवरण</h3>
                        <GenderPieChart data={data.populationByGender} />
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
    const colors: Record<string, string> = {
        blue: "border-blue-500 text-blue-400",
        purple: "border-purple-500 text-purple-400",
        green: "border-green-500 text-green-400",
        yellow: "border-yellow-500 text-yellow-400",
    };
    return (
        <div className={`bg-[#0f1729] border rounded-xl p-5 ${colors[color]}`}>
            <p className="text-gray-400 text-sm mb-2">{label}</p>
            <p className={`text-3xl font-bold ${colors[color]}`}>
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
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{value.toLocaleString()} ({pct}%)</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}