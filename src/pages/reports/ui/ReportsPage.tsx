import { useState } from "react";
import ReactECharts from "echarts-for-react";
import * as XLSX from "xlsx";
import { useAllReports } from "../api/reports.queries";
import type { ChartItem } from "../model/types";

// ── palette ──────────────────────────────────────────────────────────────────
const PALETTE = [
    "#0ea5e9","#8b5cf6","#10b981","#f59e0b","#ec4899",
    "#f43f5e","#14b8a6","#f97316","#6366f1","#84cc16",
    "#a855f7","#06b6d4",
];
const col = (i: number) => PALETTE[i % PALETTE.length];

// ── sidebar sections definition ──────────────────────────────────────────────
type SectionId =
    | "overview"
    | "population"
    | "housing"
    | "family"
    | "education"
    | "geography";

const SECTIONS: { id: SectionId; label: string; icon: string; description: string }[] = [
    { id: "overview",   icon: "📊", label: "Overview",          description: "Summary stats across all entities" },
    { id: "population", icon: "👥", label: "Population",        description: "Age groups & blood types" },
    { id: "housing",    icon: "🏠", label: "Housing",           description: "House, roof, wall & land types" },
    { id: "family",     icon: "🏘️", label: "Family & Society",  description: "Ethnicity & religion breakdown" },
    { id: "education",  icon: "🎓", label: "Education",         description: "Education programs & records" },
    { id: "geography",  icon: "🗺️", label: "Geography",         description: "Ward-wise household distribution" },
];

// ── chart helpers ─────────────────────────────────────────────────────────────
function barOption(items: ChartItem[]) {
    return {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { left: 16, right: 16, bottom: 8, top: 8, containLabel: true },
        xAxis: {
            type: "category",
            data: items.map((i) => i.label),
            axisLine: { show: false }, axisTick: { show: false },
            axisLabel: {
                color: "#64748b", fontSize: 11, fontFamily: "Nunito",
                interval: 0, rotate: items.length > 6 ? 35 : 0,
            },
        },
        yAxis: {
            type: "value",
            axisLine: { show: false }, axisTick: { show: false },
            splitLine: { lineStyle: { color: "#f1f5f9" } },
            axisLabel: { color: "#94a3b8", fontSize: 11, fontFamily: "Nunito" },
        },
        series: [{
            type: "bar", barMaxWidth: 52,
            data: items.map((item, idx) => ({
                value: item.value,
                itemStyle: { color: col(idx), borderRadius: [6, 6, 0, 0] },
            })),
        }],
    };
}

function pieOption(items: ChartItem[], centerLabel: string) {
    const total = items.reduce((s, i) => s + i.value, 0);
    return {
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: {
            bottom: 0,
            textStyle: { color: "#64748b", fontSize: 11, fontFamily: "Nunito" },
            itemWidth: 10, itemHeight: 10,
        },
        series: [{
            type: "pie", radius: ["42%", "68%"], center: ["50%", "42%"],
            padAngle: 3, itemStyle: { borderRadius: 6 },
            label: { show: false },
            data: items.map((item, idx) => ({
                value: item.value, name: item.label,
                itemStyle: { color: col(idx) },
            })),
        }],
        graphic: [
            {
                type: "text", left: "center", top: "33%",
                style: { text: total.toLocaleString(), fontSize: 20, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito" },
            },
            {
                type: "text", left: "center", top: "45%",
                style: { text: centerLabel, fontSize: 11, fill: "#94a3b8", fontFamily: "Nunito" },
            },
        ],
    };
}

// ── Excel export ──────────────────────────────────────────────────────────────
function exportToExcel(sheetName: string, items: ChartItem[], filename: string) {
    const ws = XLSX.utils.json_to_sheet(
        items.map((i) => ({ Category: i.label, Count: i.value }))
    );
    ws["!cols"] = [{ wch: 30 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
}

function exportSectionToExcel(
    sectionLabel: string,
    datasets: { name: string; items: ChartItem[] }[]
) {
    const wb = XLSX.utils.book_new();
    datasets.forEach(({ name, items }) => {
        if (items.length === 0) return;
        const ws = XLSX.utils.json_to_sheet(
            items.map((i) => ({ Category: i.label, Count: i.value }))
        );
        ws["!cols"] = [{ wch: 30 }, { wch: 12 }];
        XLSX.utils.book_append_sheet(wb, ws, name.slice(0, 31));
    });
    XLSX.writeFile(wb, `${sectionLabel.replace(/\s+/g, "_")}_Report.xlsx`);
}

// ── reusable card ─────────────────────────────────────────────────────────────
function ChartCard({
                       title, sub, children, items, exportName,
                   }: {
    title: string;
    sub: string;
    children: React.ReactNode;
    items: ChartItem[];
    exportName: string;
}) {
    return (
        <div style={{
            backgroundColor: "#fff", border: "1px solid #e2e8f0",
            borderRadius: "14px", padding: "24px",
            boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                    <p style={{ color: "#0f172a", fontSize: "15px", fontWeight: 600, margin: "0 0 2px", fontFamily: "Nunito, sans-serif" }}>{title}</p>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0, fontFamily: "Nunito, sans-serif" }}>{sub}</p>
                </div>
                <button
                    onClick={() => exportToExcel(title.slice(0, 31), items, exportName)}
                    disabled={items.length === 0}
                    style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "6px 12px", borderRadius: "8px", fontSize: "12px",
                        fontWeight: 600, fontFamily: "Nunito, sans-serif", cursor: items.length === 0 ? "not-allowed" : "pointer",
                        backgroundColor: items.length === 0 ? "#f1f5f9" : "#f0fdf4",
                        color: items.length === 0 ? "#94a3b8" : "#16a34a",
                        border: `1px solid ${items.length === 0 ? "#e2e8f0" : "#bbf7d0"}`,
                        transition: "all 0.15s",
                    }}
                >
                    ⬇ Excel
                </button>
            </div>
            {items.length > 0 ? children : (
                <div style={{
                    height: 200, display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: "#f8fafc", borderRadius: "8px",
                    color: "#94a3b8", fontSize: "13px", fontFamily: "Nunito, sans-serif",
                }}>
                    No data available yet
                </div>
            )}
        </div>
    );
}

// ── stat badge ────────────────────────────────────────────────────────────────
function StatBadge({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
    return (
        <div style={{
            backgroundColor: "#fff", border: "1px solid #e2e8f0",
            borderRadius: "14px", padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(15,23,42,0.06)", fontFamily: "Nunito, sans-serif",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "16px" }}>{icon}</span>
                <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
            </div>
            <p style={{ color, fontSize: "32px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{value.toLocaleString()}</p>
        </div>
    );
}

// ── section renderers ─────────────────────────────────────────────────────────
function OverviewSection({ d }: { d: ReturnType<typeof useAllReports>["data"] }) {
    if (!d) return null;
    const totalPeople    = d.data.ageGroups.reduce((s, i) => s + i.value, 0);
    const totalHouses    = d.data.houseTypes.reduce((s, i) => s + i.value, 0);
    const totalFamilies  = d.data.ethnicities.reduce((s, i) => s + i.value, 0);
    const totalEducation = d.data.education.reduce((s, i) => s + i.value, 0);
    const totalWards     = d.data.wards.length;
    const totalBloodRec  = d.data.bloodGroups.reduce((s, i) => s + i.value, 0);

    const allDatasets = [
        { name: "Age Groups",    items: d.data.ageGroups },
        { name: "Blood Groups",  items: d.data.bloodGroups },
        { name: "House Types",   items: d.data.houseTypes },
        { name: "Roof Types",    items: d.data.roofTypes },
        { name: "Wall Types",    items: d.data.wallTypes },
        { name: "Land Types",    items: d.data.landTypes },
        { name: "Ethnicities",   items: d.data.ethnicities },
        { name: "Religions",     items: d.data.religions },
        { name: "Education",     items: d.data.education },
        { name: "Wards",         items: d.data.wards },
    ];

    return (
        <div className="space-y-6">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ color: "#0f172a", fontSize: "20px", fontWeight: 700, margin: "0 0 4px", fontFamily: "Nunito, sans-serif" }}>Overview</h3>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0, fontFamily: "Nunito, sans-serif" }}>Summary of all entities in the database</p>
                </div>
                <button
                    onClick={() => exportSectionToExcel("Full_Report", allDatasets)}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 18px", borderRadius: "10px", fontSize: "13px",
                        fontWeight: 700, fontFamily: "Nunito, sans-serif", cursor: "pointer",
                        backgroundColor: "#16a34a", color: "#fff", border: "none",
                        boxShadow: "0 2px 8px rgba(22,163,74,0.25)", transition: "all 0.15s",
                    }}
                >
                    ⬇ Export Full Report
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <StatBadge label="Total Population"     value={totalPeople}    color="#0ea5e9" icon="👥" />
                <StatBadge label="Total Houses"         value={totalHouses}    color="#8b5cf6" icon="🏠" />
                <StatBadge label="Total Families"       value={totalFamilies}  color="#10b981" icon="🏘️" />
                <StatBadge label="Education Records"    value={totalEducation} color="#f59e0b" icon="🎓" />
                <StatBadge label="Total Wards"          value={totalWards}     color="#ec4899" icon="🗺️" />
                <StatBadge label="Blood Records"        value={totalBloodRec}  color="#f43f5e" icon="🩸" />
            </div>

            {/* mini preview charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <ChartCard title="Age Groups" sub="Quick population overview" items={d.data.ageGroups} exportName="Age_Groups">
                    <ReactECharts option={barOption(d.data.ageGroups)} style={{ height: 200 }} />
                </ChartCard>
                <ChartCard title="Ethnicity" sub="Family ethnicity distribution" items={d.data.ethnicities} exportName="Ethnicity">
                    <ReactECharts option={pieOption(d.data.ethnicities, "Families")} style={{ height: 200 }} />
                </ChartCard>
            </div>
        </div>
    );
}

function PopulationSection({ d }: { d: ReturnType<typeof useAllReports>["data"] }) {
    if (!d) return null;
    return (
        <div className="space-y-6">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ color: "#0f172a", fontSize: "20px", fontWeight: 700, margin: "0 0 4px", fontFamily: "Nunito, sans-serif" }}>Population Reports</h3>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0, fontFamily: "Nunito, sans-serif" }}>Age distribution and blood group data</p>
                </div>
                <button
                    onClick={() => exportSectionToExcel("Population", [
                        { name: "Age Groups",   items: d.data.ageGroups },
                        { name: "Blood Groups", items: d.data.bloodGroups },
                    ])}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 18px", borderRadius: "10px", fontSize: "13px",
                        fontWeight: 700, fontFamily: "Nunito, sans-serif", cursor: "pointer",
                        backgroundColor: "#16a34a", color: "#fff", border: "none",
                        boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
                    }}
                >
                    ⬇ Export Section
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <ChartCard title="Age Group Distribution" sub="Population broken down by age bands" items={d.data.ageGroups} exportName="Age_Groups">
                    <ReactECharts option={barOption(d.data.ageGroups)} style={{ height: 260 }} />
                </ChartCard>
                <ChartCard title="Blood Group Distribution" sub="Registered blood types across all persons" items={d.data.bloodGroups} exportName="Blood_Groups">
                    <ReactECharts option={pieOption(d.data.bloodGroups, "Blood Groups")} style={{ height: 260 }} />
                </ChartCard>
            </div>

            {/* data table */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <DataTable title="Age Groups — Raw Data" items={d.data.ageGroups} />
                <DataTable title="Blood Groups — Raw Data" items={d.data.bloodGroups} />
            </div>
        </div>
    );
}

function HousingSection({ d }: { d: ReturnType<typeof useAllReports>["data"] }) {
    if (!d) return null;
    return (
        <div className="space-y-6">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ color: "#0f172a", fontSize: "20px", fontWeight: 700, margin: "0 0 4px", fontFamily: "Nunito, sans-serif" }}>Housing Reports</h3>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0, fontFamily: "Nunito, sans-serif" }}>House types, roof, wall & land distribution</p>
                </div>
                <button
                    onClick={() => exportSectionToExcel("Housing", [
                        { name: "House Types", items: d.data.houseTypes },
                        { name: "Roof Types",  items: d.data.roofTypes },
                        { name: "Wall Types",  items: d.data.wallTypes },
                        { name: "Land Types",  items: d.data.landTypes },
                    ])}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 18px", borderRadius: "10px", fontSize: "13px",
                        fontWeight: 700, fontFamily: "Nunito, sans-serif", cursor: "pointer",
                        backgroundColor: "#16a34a", color: "#fff", border: "none",
                        boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
                    }}
                >
                    ⬇ Export Section
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <ChartCard title="House Types" sub="Types of house construction" items={d.data.houseTypes} exportName="House_Types">
                    <ReactECharts option={pieOption(d.data.houseTypes, "Types")} style={{ height: 240 }} />
                </ChartCard>
                <ChartCard title="Roof Types" sub="Roofing materials used" items={d.data.roofTypes} exportName="Roof_Types">
                    <ReactECharts option={pieOption(d.data.roofTypes, "Roofs")} style={{ height: 240 }} />
                </ChartCard>
                <ChartCard title="Wall Materials" sub="Wall construction materials" items={d.data.wallTypes} exportName="Wall_Types">
                    <ReactECharts option={pieOption(d.data.wallTypes, "Walls")} style={{ height: 240 }} />
                </ChartCard>
            </div>

            <ChartCard title="Land Types" sub="Distribution of land ownership categories" items={d.data.landTypes} exportName="Land_Types">
                <ReactECharts option={barOption(d.data.landTypes)} style={{ height: 240 }} />
            </ChartCard>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <DataTable title="House Types — Raw Data" items={d.data.houseTypes} />
                <DataTable title="Roof Types — Raw Data"  items={d.data.roofTypes} />
                <DataTable title="Wall Types — Raw Data"  items={d.data.wallTypes} />
                <DataTable title="Land Types — Raw Data"  items={d.data.landTypes} />
            </div>
        </div>
    );
}

function FamilySection({ d }: { d: ReturnType<typeof useAllReports>["data"] }) {
    if (!d) return null;
    return (
        <div className="space-y-6">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ color: "#0f172a", fontSize: "20px", fontWeight: 700, margin: "0 0 4px", fontFamily: "Nunito, sans-serif" }}>Family & Society Reports</h3>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0, fontFamily: "Nunito, sans-serif" }}>Ethnicity and religion breakdown across families</p>
                </div>
                <button
                    onClick={() => exportSectionToExcel("Family_Society", [
                        { name: "Ethnicities", items: d.data.ethnicities },
                        { name: "Religions",   items: d.data.religions },
                    ])}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 18px", borderRadius: "10px", fontSize: "13px",
                        fontWeight: 700, fontFamily: "Nunito, sans-serif", cursor: "pointer",
                        backgroundColor: "#16a34a", color: "#fff", border: "none",
                        boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
                    }}
                >
                    ⬇ Export Section
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <ChartCard title="Ethnicity Distribution" sub="Families grouped by ethnic background" items={d.data.ethnicities} exportName="Ethnicity">
                    <ReactECharts option={barOption(d.data.ethnicities)} style={{ height: 260 }} />
                </ChartCard>
                <ChartCard title="Religion Distribution" sub="Families grouped by religion" items={d.data.religions} exportName="Religion">
                    <ReactECharts option={pieOption(d.data.religions, "Religions")} style={{ height: 260 }} />
                </ChartCard>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <DataTable title="Ethnicity — Raw Data" items={d.data.ethnicities} />
                <DataTable title="Religion — Raw Data"  items={d.data.religions} />
            </div>
        </div>
    );
}

function EducationSection({ d }: { d: ReturnType<typeof useAllReports>["data"] }) {
    if (!d) return null;
    return (
        <div className="space-y-6">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ color: "#0f172a", fontSize: "20px", fontWeight: 700, margin: "0 0 4px", fontFamily: "Nunito, sans-serif" }}>Education Reports</h3>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0, fontFamily: "Nunito, sans-serif" }}>Programs and education records</p>
                </div>
                <button
                    onClick={() => exportSectionToExcel("Education", [
                        { name: "Education Programs", items: d.data.education },
                    ])}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 18px", borderRadius: "10px", fontSize: "13px",
                        fontWeight: 700, fontFamily: "Nunito, sans-serif", cursor: "pointer",
                        backgroundColor: "#16a34a", color: "#fff", border: "none",
                        boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
                    }}
                >
                    ⬇ Export Section
                </button>
            </div>

            <ChartCard title="Education Programs" sub="People enrolled in or completed each program" items={d.data.education} exportName="Education_Programs">
                <ReactECharts option={barOption(d.data.education)} style={{ height: 280 }} />
            </ChartCard>

            <DataTable title="Education Programs — Raw Data" items={d.data.education} />
        </div>
    );
}

function GeographySection({ d }: { d: ReturnType<typeof useAllReports>["data"] }) {
    if (!d) return null;
    return (
        <div className="space-y-6">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h3 style={{ color: "#0f172a", fontSize: "20px", fontWeight: 700, margin: "0 0 4px", fontFamily: "Nunito, sans-serif" }}>Geography Reports</h3>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0, fontFamily: "Nunito, sans-serif" }}>Ward-wise household & tole distribution</p>
                </div>
                <button
                    onClick={() => exportSectionToExcel("Geography", [
                        { name: "Ward Households", items: d.data.wards },
                    ])}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "10px 18px", borderRadius: "10px", fontSize: "13px",
                        fontWeight: 700, fontFamily: "Nunito, sans-serif", cursor: "pointer",
                        backgroundColor: "#16a34a", color: "#fff", border: "none",
                        boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
                    }}
                >
                    ⬇ Export Section
                </button>
            </div>

            <ChartCard title="Household Count by Ward" sub="Number of toles registered per ward" items={d.data.wards} exportName="Ward_Households">
                <ReactECharts option={barOption(d.data.wards)} style={{ height: 280 }} />
            </ChartCard>

            <DataTable title="Ward Households — Raw Data" items={d.data.wards} />
        </div>
    );
}

// ── raw data table ────────────────────────────────────────────────────────────
function DataTable({ title, items }: { title: string; items: ChartItem[] }) {
    const total = items.reduce((s, i) => s + i.value, 0);
    return (
        <div style={{
            backgroundColor: "#fff", border: "1px solid #e2e8f0",
            borderRadius: "14px", overflow: "hidden",
            boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
                <p style={{ color: "#0f172a", fontSize: "14px", fontWeight: 600, margin: 0, fontFamily: "Nunito, sans-serif" }}>{title}</p>
            </div>
            {items.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: "13px", padding: "20px", fontFamily: "Nunito, sans-serif" }}>No data available</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Nunito, sans-serif" }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                        <th style={{ padding: "10px 20px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</th>
                        <th style={{ padding: "10px 20px", textAlign: "right", fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>Count</th>
                        <th style={{ padding: "10px 20px", textAlign: "right", fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>%</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx} style={{ borderTop: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px 20px", fontSize: "13px", color: "#334155" }}>
                                <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", backgroundColor: col(idx), marginRight: "8px", verticalAlign: "middle" }} />
                                {item.label}
                            </td>
                            <td style={{ padding: "10px 20px", fontSize: "13px", color: "#0f172a", fontWeight: 600, textAlign: "right" }}>{item.value.toLocaleString()}</td>
                            <td style={{ padding: "10px 20px", fontSize: "13px", color: "#64748b", textAlign: "right" }}>
                                {total > 0 ? ((item.value / total) * 100).toFixed(1) : "0"}%
                            </td>
                        </tr>
                    ))}
                    <tr style={{ borderTop: "2px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                        <td style={{ padding: "10px 20px", fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Total</td>
                        <td style={{ padding: "10px 20px", fontSize: "13px", fontWeight: 700, color: "#0f172a", textAlign: "right" }}>{total.toLocaleString()}</td>
                        <td style={{ padding: "10px 20px", fontSize: "13px", fontWeight: 700, color: "#0f172a", textAlign: "right" }}>100%</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

// ── main page ─────────────────────────────────────────────────────────────────
export function ReportsPage() {
    const [active, setActive] = useState<SectionId>("overview");
    const { data, isLoading, isError } = useAllReports();

    if (isLoading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "320px", fontFamily: "Nunito, sans-serif" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{
                        width: "32px", height: "32px",
                        border: "4px solid #0ea5e9", borderTopColor: "transparent",
                        borderRadius: "50%", animation: "spin 0.8s linear infinite",
                        margin: "0 auto 12px",
                    }} />
                    <p style={{ color: "#64748b", fontSize: "15px" }}>Loading reports…</p>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (isError || !data?.data) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "320px" }}>
                <p style={{ color: "#dc2626", fontSize: "15px", fontFamily: "Nunito, sans-serif" }}>
                    Failed to load reports. Make sure the backend is running.
                </p>
            </div>
        );
    }

    return (
        <section style={{ fontFamily: "Nunito, sans-serif" }}>
            {/* page header */}
            <div style={{ marginBottom: "24px" }}>
                <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>Live Data</p>
                <h2 style={{ color: "#0f172a", fontSize: "32px", fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.015em" }}>Reports</h2>
                <p style={{ color: "#64748b", fontSize: "15px", margin: 0 }}>Select a category from the sidebar to view detailed reports</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "24px", alignItems: "start" }}>

                {/* ── sidebar ── */}
                <div style={{
                    backgroundColor: "#fff", border: "1px solid #e2e8f0",
                    borderRadius: "14px", overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
                    position: "sticky", top: "24px",
                }}>
                    <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f1f5f9" }}>
                        <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
                            Report Categories
                        </p>
                    </div>
                    {SECTIONS.map((s) => {
                        const isActive = active === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActive(s.id)}
                                style={{
                                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                                    padding: "12px 16px", border: "none", cursor: "pointer", textAlign: "left",
                                    backgroundColor: isActive ? "#f0f9ff" : "transparent",
                                    borderLeft: `3px solid ${isActive ? "#0ea5e9" : "transparent"}`,
                                    transition: "all 0.15s",
                                }}
                            >
                                <span style={{ fontSize: "16px" }}>{s.icon}</span>
                                <div>
                                    <p style={{
                                        margin: 0, fontSize: "13px", fontWeight: isActive ? 700 : 500,
                                        color: isActive ? "#0ea5e9" : "#334155", fontFamily: "Nunito, sans-serif",
                                    }}>{s.label}</p>
                                    <p style={{
                                        margin: 0, fontSize: "11px",
                                        color: isActive ? "#7dd3fc" : "#94a3b8", fontFamily: "Nunito, sans-serif",
                                    }}>{s.description}</p>
                                </div>
                            </button>
                        );
                    })}

                    {/* timestamp */}
                    <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9" }}>
                        <p style={{ color: "#cbd5e1", fontSize: "10px", margin: 0, fontFamily: "Nunito, sans-serif" }}>
                            Updated: {new Date(data.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                {/* ── content ── */}
                <div>
                    {active === "overview"   && <OverviewSection   d={data} />}
                    {active === "population" && <PopulationSection d={data} />}
                    {active === "housing"    && <HousingSection    d={data} />}
                    {active === "family"     && <FamilySection     d={data} />}
                    {active === "education"  && <EducationSection  d={data} />}
                    {active === "geography"  && <GeographySection  d={data} />}
                </div>

            </div>
        </section>
    );
}
