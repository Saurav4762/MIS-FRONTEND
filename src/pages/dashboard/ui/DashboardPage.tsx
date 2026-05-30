import { useDashboardStats } from "../api/dashboard.queries";
import ReactECharts from "echarts-for-react";

export function DashboardPage() {
    const { data, isLoading, isError } = useDashboardStats();

    if (isLoading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "256px", fontFamily: "Nunito, sans-serif" }}>
            <div className="text-center">
                <div className="w-8 h-8 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p style={{ color: "#64748b", fontSize: "15px" }}>Loading dashboard…</p>
            </div>
        </div>
    );

    if (isError || !data?.data) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "256px" }}>
            <p style={{ color: "#dc2626", fontSize: "15px", fontFamily: "Nunito, sans-serif" }}>Failed to load dashboard data.</p>
        </div>
    );

    const stats = data.data;
    const literacyRate = stats.totalPopulation > 0 ? ((stats.literate / stats.totalPopulation) * 100).toFixed(1) : "0";
    const employmentRate = stats.ageGroup16Plus > 0 ? (((stats.ageGroup16Plus - stats.jobless) / stats.ageGroup16Plus) * 100).toFixed(1) : "0";
    const employedCount = stats.ageGroup16Plus - stats.jobless;

    const genderChart = {
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: 0, textStyle: { color: "#64748b", fontSize: 12, fontFamily: "Nunito" } },
        series: [{
            type: "pie", radius: ["48%", "72%"], center: ["50%", "44%"],
            padAngle: 4, itemStyle: { borderRadius: 8 },
            data: [
                { value: stats.populationByGender.male, name: "Male", itemStyle: { color: "#0ea5e9" } },
                { value: stats.populationByGender.female, name: "Female", itemStyle: { color: "#ec4899" } },
                { value: stats.populationByGender.others, name: "Others", itemStyle: { color: "#a855f7" } },
            ],
            label: { show: false },
        }],
        graphic: [
            { type: "text", left: "center", top: "36%", style: { text: stats.totalPopulation.toLocaleString(), fontSize: 22, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito" } },
            { type: "text", left: "center", top: "50%", style: { text: "Total", fontSize: 12, fill: "#94a3b8", fontFamily: "Nunito" } },
        ],
    };

    const literacyChart = {
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: 0, textStyle: { color: "#64748b", fontSize: 12, fontFamily: "Nunito" } },
        series: [{
            type: "pie", radius: ["48%", "72%"], center: ["50%", "44%"],
            padAngle: 4, itemStyle: { borderRadius: 8 },
            data: [
                { value: stats.literate, name: "Literate", itemStyle: { color: "#10b981" } },
                { value: stats.totalPopulation - stats.literate, name: "Illiterate", itemStyle: { color: "#f43f5e" } },
            ],
            label: { show: false },
        }],
        graphic: [
            { type: "text", left: "center", top: "36%", style: { text: `${literacyRate}%`, fontSize: 22, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito" } },
            { type: "text", left: "center", top: "50%", style: { text: "Literate", fontSize: 12, fill: "#94a3b8", fontFamily: "Nunito" } },
        ],
    };

    const employmentChart = {
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: 0, textStyle: { color: "#64748b", fontSize: 12, fontFamily: "Nunito" } },
        series: [{
            type: "pie", radius: ["48%", "72%"], center: ["50%", "44%"],
            padAngle: 4, itemStyle: { borderRadius: 8 },
            data: [
                { value: employedCount, name: "Employed", itemStyle: { color: "#f59e0b" } },
                { value: stats.jobless, name: "Jobless", itemStyle: { color: "#94a3b8" } },
            ],
            label: { show: false },
        }],
        graphic: [
            { type: "text", left: "center", top: "36%", style: { text: `${employmentRate}%`, fontSize: 22, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito" } },
            { type: "text", left: "center", top: "50%", style: { text: "Employed", fontSize: 12, fill: "#94a3b8", fontFamily: "Nunito" } },
        ],
    };

    const barChart = {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { left: 16, right: 16, bottom: 8, top: 8, containLabel: true },
        xAxis: {
            type: "category",
            data: ["Population", "Age 16+", "Literate", "Employed"],
            axisLine: { show: false }, axisTick: { show: false },
            axisLabel: { color: "#64748b", fontSize: 12, fontFamily: "Nunito" },
        },
        yAxis: {
            type: "value", axisLine: { show: false }, axisTick: { show: false },
            splitLine: { lineStyle: { color: "#f1f5f9" } },
            axisLabel: { color: "#94a3b8", fontSize: 11, fontFamily: "Nunito" },
        },
        series: [{
            type: "bar", barMaxWidth: 56,
            data: [
                { value: stats.totalPopulation, itemStyle: { color: "#0ea5e9", borderRadius: [6, 6, 0, 0] } },
                { value: stats.ageGroup16Plus, itemStyle: { color: "#8b5cf6", borderRadius: [6, 6, 0, 0] } },
                { value: stats.literate, itemStyle: { color: "#10b981", borderRadius: [6, 6, 0, 0] } },
                { value: employedCount, itemStyle: { color: "#f59e0b", borderRadius: [6, 6, 0, 0] } },
            ],
        }],
    };

    const F = (n: number) => n.toLocaleString();

    return (
        <section style={{ fontFamily: "Nunito, sans-serif" }} className="space-y-6">

            {/* Page Title */}
            <div>
                <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>Live Data</p>
                <h2 style={{ color: "#0f172a", fontSize: "32px", fontWeight: 600, margin: 0, letterSpacing: "-0.015em" }}>Dashboard Overview</h2>
                <p style={{ color: "#64748b", fontSize: "15px", margin: "4px 0 0" }}>Municipality population and survey statistics</p>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {[
                    { label: "Total Population", value: F(stats.totalPopulation), sub: "Registered citizens", color: "#0ea5e9" },
                    { label: "Total Households", value: F(stats.totalHouseholds), sub: "Registered households", color: "#8b5cf6" },
                    { label: "Literacy Rate", value: `${literacyRate}%`, sub: `${F(stats.literate)} literate`, color: "#10b981" },
                    { label: "Employment Rate", value: `${employmentRate}%`, sub: "Age 16+ population", color: "#f59e0b" },
                ].map((card) => (
                    <div key={card.label} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                        <p style={{ color: "#64748b", fontSize: "13px", fontWeight: 600, margin: "0 0 8px" }}>{card.label}</p>
                        <p style={{ color: card.color, fontSize: "32px", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{card.value}</p>
                        <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* Pie Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {[
                    { title: "Population by Gender", sub: "Male / Female / Others", chart: genderChart },
                    { title: "Literacy Status", sub: "Literate vs Illiterate", chart: literacyChart },
                    { title: "Employment Status", sub: "Age 16+ population", chart: employmentChart },
                ].map((item) => (
                    <div key={item.title} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                        <p style={{ color: "#0f172a", fontSize: "15px", fontWeight: 600, margin: "0 0 2px" }}>{item.title}</p>
                        <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 16px" }}>{item.sub}</p>
                        <ReactECharts option={item.chart} style={{ height: 260 }} />
                    </div>
                ))}
            </div>

            {/* Bar Chart */}
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                <p style={{ color: "#0f172a", fontSize: "15px", fontWeight: 600, margin: "0 0 2px" }}>Population Breakdown</p>
                <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 16px" }}>Key demographic indicators</p>
                <ReactECharts option={barChart} style={{ height: 260 }} />
            </div>

            {/* Gender Detail */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {[
                    { label: "Male Population", value: stats.populationByGender.male, color: "#0ea5e9" },
                    { label: "Female Population", value: stats.populationByGender.female, color: "#ec4899" },
                    { label: "Others", value: stats.populationByGender.others, color: "#a855f7" },
                ].map((item) => {
                    const pct = stats.totalPopulation > 0 ? ((item.value / stats.totalPopulation) * 100).toFixed(1) : "0";
                    return (
                        <div key={item.label} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                            <p style={{ color: "#64748b", fontSize: "13px", fontWeight: 600, margin: "0 0 8px" }}>{item.label}</p>
                            <p style={{ color: item.color, fontSize: "32px", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.02em" }}>{F(item.value)}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ flex: 1, height: "4px", backgroundColor: "#f1f5f9", borderRadius: "999px" }}>
                                    <div style={{ width: `${pct}%`, height: "100%", backgroundColor: item.color, borderRadius: "999px" }} />
                                </div>
                                <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 600 }}>{pct}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}