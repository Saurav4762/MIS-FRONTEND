import { useDashboardStats } from "../api/dashboard.queries";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const COLORS = {
    blue: "#0ea5e9",
    sky: "#38bdf8",
    slate: "#94a3b8",
    green: "#10b981",
    amber: "#f59e0b",
    red: "#ef4444",
};

function StatCard({ label, value, color = "#0ea5e9" }: { label: string; value: string | number; color?: string }) {
    return (
        <div className="rounded-xl border border-(--mis-color-ink-200) bg-(--mis-color-white) p-5 space-y-1 shadow-sm">
            <p className="text-xs text-(--mis-color-ink-500) uppercase tracking-wide font-semibold">{label}</p>
            <p className="text-3xl font-bold" style={{ color }}>{value}</p>
        </div>
    );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-(--mis-color-ink-200) bg-(--mis-color-white) p-6 shadow-sm">
            <p className="text-md font-semibold text-(--mis-color-ink-700) mb-4">{title}</p>
            {children}
        </div>
    );
}

export function DashboardPage() {
    const { data, isLoading, isError } = useDashboardStats();

    if (isLoading) return <div className="flex items-center justify-center h-64 text-(--mis-color-ink-400)">Loading dashboard...</div>;
    if (isError || !data?.data) return <div className="flex items-center justify-center h-64 text-(--mis-color-error-500)">Failed to load dashboard data.</div>;

    const stats = data.data;
    const literacyRate = ((stats.literate / stats.totalPopulation) * 100).toFixed(1);
    const employmentRate = (((stats.ageGroup16Plus - stats.jobless) / stats.ageGroup16Plus) * 100).toFixed(1);

    const genderChart = {
        labels: ["Male", "Female", "Others"],
        datasets: [{ data: [stats.populationByGender.male, stats.populationByGender.female, stats.populationByGender.others], backgroundColor: [COLORS.blue, COLORS.sky, COLORS.slate], borderWidth: 0 }],
    };

    const literacyChart = {
        labels: ["Literate", "Illiterate"],
        datasets: [{ data: [stats.literate, stats.totalPopulation - stats.literate], backgroundColor: [COLORS.green, COLORS.slate], borderWidth: 0 }],
    };

    const employmentChart = {
        labels: ["Employed", "Jobless"],
        datasets: [{ data: [stats.ageGroup16Plus - stats.jobless, stats.jobless], backgroundColor: [COLORS.blue, COLORS.red], borderWidth: 0 }],
    };

    const barChart = {
        labels: ["Total Population", "Age 16+", "Literate", "Jobless"],
        datasets: [{ label: "Count", data: [stats.totalPopulation, stats.ageGroup16Plus, stats.literate, stats.jobless], backgroundColor: COLORS.blue, borderRadius: 6 }],
    };

    const pieOptions = { plugins: { legend: { position: "bottom" as const } }, cutout: "60%" };
    const barOptions = { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: "#f1f5f9" } } } };

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-3xl font-semibold tracking-tight text-(--mis-color-ink-900)">Dashboard Overview</h2>
                <p className="mt-1 text-sm text-(--mis-color-ink-400)">Municipality population and survey statistics</p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="Total Population" value={stats.totalPopulation.toLocaleString()} color={COLORS.blue} />
                <StatCard label="Total Households" value={stats.totalHouseholds.toLocaleString()} color={COLORS.sky} />
                <StatCard label="Literacy Rate" value={`${literacyRate}%`} color={COLORS.green} />
                <StatCard label="Employment Rate" value={`${employmentRate}%`} color={COLORS.amber} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <ChartCard title="Population by Gender">
                    <div className="flex justify-center"><div style={{ width: 260, height: 220 }}><Pie data={genderChart} options={pieOptions} /></div></div>
                </ChartCard>
                <ChartCard title="Literacy Status">
                    <div className="flex justify-center"><div style={{ width: 260, height: 220 }}><Pie data={literacyChart} options={pieOptions} /></div></div>
                </ChartCard>
                <ChartCard title="Employment Status (Age 16+)">
                    <div className="flex justify-center"><div style={{ width: 260, height: 220 }}><Pie data={employmentChart} options={pieOptions} /></div></div>
                </ChartCard>
            </div>

            <ChartCard title="Population Breakdown">
                <Bar data={barChart} options={barOptions} height={100} />
            </ChartCard>

            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Male Population" value={stats.populationByGender.male.toLocaleString()} color={COLORS.blue} />
                <StatCard label="Female Population" value={stats.populationByGender.female.toLocaleString()} color={COLORS.sky} />
                <StatCard label="Others" value={stats.populationByGender.others.toLocaleString()} color={COLORS.slate} />
            </div>
        </section>
    );
}