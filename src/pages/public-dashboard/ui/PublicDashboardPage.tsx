import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { publicDashboardApi } from "../api/public-dashboard.api";
import type { DashboardStats } from "@pages/dashboard/model/types";
import ReactECharts from "echarts-for-react";

export function PublicDashboardPage() {
    const navigate = useNavigate();
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        publicDashboardApi.getStats()
            .then(res => setData(res.data))
            .catch(() => setError("Failed to load data"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc", fontFamily: "Nunito, sans-serif" }}>
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p style={{ color: "#64748b", fontSize: "15px" }}>Loading dashboard…</p>
            </div>
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
            <p style={{ color: "#dc2626", fontSize: "15px" }}>{error || "No data available"}</p>
        </div>
    );

    const literacyRate = data.totalPopulation > 0 ? ((data.literate / data.totalPopulation) * 100).toFixed(1) : "0";
    const employmentRate = data.ageGroup16Plus > 0 ? (((data.ageGroup16Plus - data.jobless) / data.ageGroup16Plus) * 100).toFixed(1) : "0";
    const illiterateCount = data.totalPopulation - data.literate;
    const employedCount = data.ageGroup16Plus - data.jobless;

    const genderChart = {
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: 0, textStyle: { color: "#64748b", fontSize: 12, fontFamily: "Nunito" } },
        series: [{
            type: "pie", radius: ["48%", "72%"], center: ["50%", "44%"],
            padAngle: 4, itemStyle: { borderRadius: 8 },
            data: [
                { value: data.populationByGender.male, name: "Male", itemStyle: { color: "#0ea5e9" } },
                { value: data.populationByGender.female, name: "Female", itemStyle: { color: "#ec4899" } },
                { value: data.populationByGender.others, name: "Others", itemStyle: { color: "#a855f7" } },
            ],
            label: { show: false },
        }],
        graphic: [
            { type: "text", left: "center", top: "36%", style: { text: data.totalPopulation.toLocaleString(), fontSize: 24, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito" } },
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
                { value: data.literate, name: "Literate", itemStyle: { color: "#10b981" } },
                { value: illiterateCount, name: "Illiterate", itemStyle: { color: "#f43f5e" } },
            ],
            label: { show: false },
        }],
        graphic: [
            { type: "text", left: "center", top: "36%", style: { text: `${literacyRate}%`, fontSize: 24, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito" } },
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
                { value: data.jobless, name: "Jobless", itemStyle: { color: "#94a3b8" } },
            ],
            label: { show: false },
        }],
        graphic: [
            { type: "text", left: "center", top: "36%", style: { text: `${employmentRate}%`, fontSize: 24, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito" } },
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
                { value: data.totalPopulation, itemStyle: { color: "#0ea5e9", borderRadius: [6, 6, 0, 0] } },
                { value: data.ageGroup16Plus, itemStyle: { color: "#8b5cf6", borderRadius: [6, 6, 0, 0] } },
                { value: data.literate, itemStyle: { color: "#10b981", borderRadius: [6, 6, 0, 0] } },
                { value: employedCount, itemStyle: { color: "#f59e0b", borderRadius: [6, 6, 0, 0] } },
            ],
        }],
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Nunito, sans-serif" }}>
            {/* Header */}
            <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", backgroundColor: "#0ea5e9", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#ffffff", fontSize: "13px", fontWeight: 800 }}>BM</span>
                    </div>
                    <div>
                        <p style={{ color: "#0f172a", fontSize: "15px", fontWeight: 700, margin: 0 }}>Bhadrapur Municipality</p>
                        <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, margin: 0, letterSpacing: "0.05em" }}>MUNICIPALITY INFORMATION SYSTEM</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate({ to: "/Login" })}
                    style={{ height: "40px", padding: "0 20px", backgroundColor: "#0ea5e9", color: "#ffffff", fontSize: "15px", fontWeight: 700, borderRadius: "10px", border: "none", cursor: "pointer", transition: "background-color 150ms ease", fontFamily: "Nunito, sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0284c7"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0ea5e9"}
                >
                    Sign In →
                </button>
            </header>

            <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
                {/* Page Title */}
                <div style={{ marginBottom: "24px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>Live Data</p>
                    <h1 style={{ color: "#0f172a", fontSize: "32px", fontWeight: 600, margin: 0, letterSpacing: "-0.015em" }}>Municipal Dashboard</h1>
                    <p style={{ color: "#64748b", fontSize: "15px", margin: "4px 0 0" }}>Real-time statistics from the municipal database</p>
                </div>

                {/* Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                    {[
                        { label: "Total Population", value: data.totalPopulation.toLocaleString(), sub: "Registered citizens", color: "#0ea5e9", bg: "#f0f9ff" },
                        { label: "Total Households", value: data.totalHouseholds.toLocaleString(), sub: "Registered households", color: "#8b5cf6", bg: "#f5f3ff" },
                        { label: "Literacy Rate", value: `${literacyRate}%`, sub: `${data.literate.toLocaleString()} literate`, color: "#10b981", bg: "#ecfdf5" },
                        { label: "Employment Rate", value: `${employmentRate}%`, sub: `Age 16+ population`, color: "#f59e0b", bg: "#fffbeb" },
                    ].map((card) => (
                        <div key={card.label} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                            <p style={{ color: "#64748b", fontSize: "13px", fontWeight: 600, margin: "0 0 8px", letterSpacing: "0.02em" }}>{card.label}</p>
                            <p style={{ color: card.color, fontSize: "32px", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{card.value}</p>
                            <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>{card.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
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
                <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)", marginBottom: "16px" }}>
                    <p style={{ color: "#0f172a", fontSize: "15px", fontWeight: 600, margin: "0 0 2px" }}>Population Breakdown</p>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 16px" }}>Key demographic indicators</p>
                    <ReactECharts option={barChart} style={{ height: 260 }} />
                </div>

                {/* Gender Detail Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    {[
                        { label: "Male Population", value: data.populationByGender.male, pct: data.totalPopulation > 0 ? ((data.populationByGender.male / data.totalPopulation) * 100).toFixed(1) : "0", color: "#0ea5e9" },
                        { label: "Female Population", value: data.populationByGender.female, pct: data.totalPopulation > 0 ? ((data.populationByGender.female / data.totalPopulation) * 100).toFixed(1) : "0", color: "#ec4899" },
                        { label: "Others", value: data.populationByGender.others, pct: data.totalPopulation > 0 ? ((data.populationByGender.others / data.totalPopulation) * 100).toFixed(1) : "0", color: "#a855f7" },
                    ].map((item) => (
                        <div key={item.label} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                            <p style={{ color: "#64748b", fontSize: "13px", fontWeight: 600, margin: "0 0 8px" }}>{item.label}</p>
                            <p style={{ color: item.color, fontSize: "32px", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{item.value.toLocaleString()}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                                <div style={{ flex: 1, height: "4px", backgroundColor: "#f1f5f9", borderRadius: "999px" }}>
                                    <div style={{ width: `${item.pct}%`, height: "100%", backgroundColor: item.color, borderRadius: "999px" }} />
                                </div>
                                <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 600 }}>{item.pct}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid #e2e8f0", padding: "20px 32px", textAlign: "center", marginTop: "32px" }}>
                <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>© 2026 Bhadrapur Municipality · All rights reserved</p>
            </footer>
        </div>
    );
}