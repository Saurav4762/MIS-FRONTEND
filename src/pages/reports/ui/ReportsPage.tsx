import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { useAllReports } from "../api/reports.queries";
import type { ChartItem } from "../model/types";
import type React from "react";

// ── colour palette ──────────────────────────────────────────────────────────
const PALETTE = [
    "#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899",
    "#f43f5e", "#14b8a6", "#f97316", "#6366f1", "#84cc16",
    "#a855f7", "#06b6d4",
];

const col = (i: number) => PALETTE[i % PALETTE.length];

// ── helpers ─────────────────────────────────────────────────────────────────
function barOption(items: ChartItem[]) {
    return {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { left: 16, right: 16, bottom: 8, top: 8, containLabel: true },
        xAxis: {
            type: "category",
            data: items.map((i) => i.label),
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: "#64748b", fontSize: 11, fontFamily: "Nunito", interval: 0, rotate: items.length > 6 ? 30 : 0 },
        },
        yAxis: {
            type: "value",
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: "#f1f5f9" } },
            axisLabel: { color: "#94a3b8", fontSize: 11, fontFamily: "Nunito" },
        },
        series: [{
            type: "bar",
            barMaxWidth: 48,
            data: items.map((item, idx) => ({
                value: item.value,
                itemStyle: { color: col(idx), borderRadius: [6, 6, 0, 0] },
            })),
        }],
    };
}

function pieOption(items: ChartItem[], centerLabel: string) {
    return {
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: {
            bottom: 0,
            textStyle: { color: "#64748b", fontSize: 11, fontFamily: "Nunito" },
            itemWidth: 10, itemHeight: 10,
        },
        series: [{
            type: "pie",
            radius: ["42%", "68%"],
            center: ["50%", "42%"],
            padAngle: 3,
            itemStyle: { borderRadius: 6 },
            label: { show: false },
            data: items.map((item, idx) => ({
                value: item.value,
                name: item.label,
                itemStyle: { color: col(idx) },
            })),
        }],
        graphic: [
            {
                type: "text", left: "center", top: "34%",
                style: {
                    text: items.reduce((s, i) => s + i.value, 0).toLocaleString(),
                    fontSize: 20, fontWeight: "bold", fill: "#0f172a", fontFamily: "Nunito",
                },
            },
            {
                type: "text", left: "center", top: "46%",
                style: { text: centerLabel, fontSize: 11, fill: "#94a3b8", fontFamily: "Nunito" },
            },
        ],
    };
}

// ── sub-components ───────────────────────────────────────────────────────────
function Card({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
    return (
        <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        }}>
            <p style={{ color: "#0f172a", fontSize: "15px", fontWeight: 600, margin: "0 0 2px", fontFamily: "Nunito, sans-serif" }}>{title}</p>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 16px", fontFamily: "Nunito, sans-serif" }}>{sub}</p>
            {children}
        </div>
    );
}

function StatBadge({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
            fontFamily: "Nunito, sans-serif",
        }}>
            <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
            <p style={{ color, fontSize: "28px", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{value.toLocaleString()}</p>
        </div>
    );
}

// explicit type for report visibility keys to satisfy TypeScript indexing
type VisibleReports = {
    ageGroups: boolean;
    bloodGroups: boolean;
    houseTypes: boolean;
    roofTypes: boolean;
    wallTypes: boolean;
    landTypes: boolean;
    ethnicities: boolean;
    religions: boolean;
    education: boolean;
    wards: boolean;
};

interface CollapsibleSectionProps {
    icon: string;
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    visibleReports: VisibleReports;
    onToggleReport: (key: keyof VisibleReports) => void;
    reports: { key: keyof VisibleReports; label: string }[];
    children: React.ReactNode;
}

function CollapsibleSection({
                                icon,
                                title,
                                isOpen,
                                onToggle,
                                visibleReports,
                                onToggleReport,
                                reports,
                                children,
                            }: CollapsibleSectionProps) {
    const buttonStyle: React.CSSProperties = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        backgroundColor: "#f8fafc",
        border: "none",
        cursor: "pointer",
        borderBottom: isOpen ? "1px solid #e2e8f0" : "none",
        gap: "12px",
    };

    const labelStyle = (isActive: boolean): React.CSSProperties => ({
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        backgroundColor: isActive ? "#e0f2fe" : "#f1f5f9",
        border: `1px solid ${isActive ? "#0ea5e9" : "#cbd5e1"}`,
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "13px",
        fontFamily: "Nunito, sans-serif",
        userSelect: "none",
        transition: "all 0.2s",
    });

    return (
        <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        }}>
            {/* Header */}
            <button onClick={onToggle} style={buttonStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <span style={{ fontSize: "20px" }}>{icon}</span>
                    <p style={{
                        color: "#0f172a", fontSize: "15px", fontWeight: 600,
                        margin: 0, fontFamily: "Nunito, sans-serif",
                    }}>{title}</p>
                </div>
                <span style={{ fontSize: "18px", color: "#64748b", transition: "transform 0.2s" }}>
                    {isOpen ? "▼" : "▶"}
                </span>
            </button>

            {/* Collapsible Content */}
            {isOpen && (
                <div style={{ padding: "16px 24px", backgroundColor: "#ffffff" }}>
                    {/* Report selector dropdown */}
                    <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
                        <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Nunito, sans-serif" }}>
                            Select Reports to Display
                        </p>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {reports.map(({ key, label }) => (
                                <label key={key} style={labelStyle(visibleReports[key])}>
                                    <input
                                        type="checkbox"
                                        checked={visibleReports[key]}
                                        onChange={() => onToggleReport(key)}
                                        style={{ cursor: "pointer", width: "14px", height: "14px" }}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Charts */}
                    {children}
                </div>
            )}
        </div>
    );
}

function EmptyChart({ message }: { message: string }) {
    return (
        <div style={{
            height: 240, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#94a3b8", fontSize: "13px", fontFamily: "Nunito, sans-serif",
            backgroundColor: "#f8fafc", borderRadius: "8px",
        }}>
            {message}
        </div>
    );
}

// ── main page ────────────────────────────────────────────────────────────────
export function ReportsPage() {
    const { data, isLoading, isError } = useAllReports();

    // State for collapsible sections
    const [openSections, setOpenSections] = useState({
        population: true,
        housing: true,
        family: true,
        education: true,
        geography: true,
    });

    // State for visible reports within each section
    const [visibleReports, setVisibleReports] = useState<VisibleReports>({
        // Population
        ageGroups: true,
        bloodGroups: true,
        // Housing
        houseTypes: true,
        roofTypes: true,
        wallTypes: true,
        landTypes: true,
        // Family & Society
        ethnicities: true,
        religions: true,
        // Education
        education: true,
        // Geography
        wards: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleReport = (key: keyof VisibleReports) => {
        setVisibleReports((prev) => ({ ...prev, [key]: !prev[key] } as VisibleReports));
    };

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
                    Failed to load report data. Make sure the backend is running.
                </p>
            </div>
        );
    }

    const d = data.data;

    // top-level summary counts
    const totalPeople = d.ageGroups.reduce((s, i) => s + i.value, 0);
    const totalHouses = d.houseTypes.reduce((s, i) => s + i.value, 0);
    const totalFamilies = d.ethnicities.reduce((s, i) => s + i.value, 0);
    const totalEducation = d.education.reduce((s, i) => s + i.value, 0);

    return (
        <section style={{ fontFamily: "Nunito, sans-serif" }} className="space-y-6">

            {/* Header */}
            <div>
                <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>
                    Live Data
                </p>
                <h2 style={{ color: "#0f172a", fontSize: "32px", fontWeight: 600, margin: 0, letterSpacing: "-0.015em" }}>
                    Reports
                </h2>
                <p style={{ color: "#64748b", fontSize: "15px", margin: "4px 0 0" }}>
                    Select the reports you want to view from the database below
                </p>
            </div>

            {/* Summary stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                <StatBadge label="Total Population" value={totalPeople} color="#0ea5e9" />
                <StatBadge label="Total Houses" value={totalHouses} color="#8b5cf6" />
                <StatBadge label="Total Families" value={totalFamilies} color="#10b981" />
                <StatBadge label="Education Records" value={totalEducation} color="#f59e0b" />
            </div>

            {/* ── POPULATION SECTION ─────────────────────────────────── */}
            <CollapsibleSection
                icon="👥"
                title="Population"
                isOpen={openSections.population}
                onToggle={() => toggleSection("population")}
                visibleReports={visibleReports}
                onToggleReport={toggleReport}
                reports={[
                    { key: "ageGroups", label: "Age Group Distribution" },
                    { key: "bloodGroups", label: "Blood Group Distribution" },
                ]}
            >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {visibleReports.ageGroups && (
                        <Card title="Age Group Distribution" sub="Population breakdown by age bands">
                            {d.ageGroups.length > 0
                                ? <ReactECharts option={barOption(d.ageGroups)} style={{ height: 240 }} />
                                : <EmptyChart message="No age group data available" />}
                        </Card>
                    )}
                    {visibleReports.bloodGroups && (
                        <Card title="Blood Group Distribution" sub="Registered blood types across all persons">
                            {d.bloodGroups.length > 0
                                ? <ReactECharts option={pieOption(d.bloodGroups, "Blood Groups")} style={{ height: 240 }} />
                                : <EmptyChart message="No blood group data available" />}
                        </Card>
                    )}
                </div>
            </CollapsibleSection>

            {/* ── HOUSING SECTION ────────────────────────────────────── */}
            <CollapsibleSection
                icon="🏠"
                title="Housing"
                isOpen={openSections.housing}
                onToggle={() => toggleSection("housing")}
                visibleReports={visibleReports}
                onToggleReport={toggleReport}
                reports={[
                    { key: "houseTypes", label: "House Types" },
                    { key: "roofTypes", label: "Roof Types" },
                    { key: "wallTypes", label: "Wall Materials" },
                    { key: "landTypes", label: "Land Types" },
                ]}
            >
                <div>
                    <div style={{ display: "grid", gridTemplateColumns: visibleReports.landTypes ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
                        {visibleReports.houseTypes && (
                            <Card title="House Types" sub="Distribution of house construction types">
                                {d.houseTypes.length > 0
                                    ? <ReactECharts option={pieOption(d.houseTypes, "Types")} style={{ height: 240 }} />
                                    : <EmptyChart message="No house type data" />}
                            </Card>
                        )}
                        {visibleReports.roofTypes && (
                            <Card title="Roof Types" sub="Materials used for roofing">
                                {d.roofTypes.length > 0
                                    ? <ReactECharts option={pieOption(d.roofTypes, "Roofs")} style={{ height: 240 }} />
                                    : <EmptyChart message="No roof type data" />}
                            </Card>
                        )}
                        {visibleReports.wallTypes && (
                            <Card title="Wall Materials" sub="Construction material for walls">
                                {d.wallTypes.length > 0
                                    ? <ReactECharts option={pieOption(d.wallTypes, "Walls")} style={{ height: 240 }} />
                                    : <EmptyChart message="No wall type data" />}
                            </Card>
                        )}
                    </div>
                    {visibleReports.landTypes && (
                        <Card title="Land Types" sub="Distribution of land ownership / type categories">
                            {d.landTypes.length > 0
                                ? <ReactECharts option={barOption(d.landTypes)} style={{ height: 220 }} />
                                : <EmptyChart message="No land type data" />}
                        </Card>
                    )}
                </div>
            </CollapsibleSection>

            {/* ── FAMILY & SOCIETY SECTION ───────────────────────────── */}
            <CollapsibleSection
                icon="🏘️"
                title="Family & Society"
                isOpen={openSections.family}
                onToggle={() => toggleSection("family")}
                visibleReports={visibleReports}
                onToggleReport={toggleReport}
                reports={[
                    { key: "ethnicities", label: "Ethnicity Distribution" },
                    { key: "religions", label: "Religion Distribution" },
                ]}
            >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {visibleReports.ethnicities && (
                        <Card title="Ethnicity Distribution" sub="Families grouped by ethnic background">
                            {d.ethnicities.length > 0
                                ? <ReactECharts option={barOption(d.ethnicities)} style={{ height: 240 }} />
                                : <EmptyChart message="No ethnicity data" />}
                        </Card>
                    )}
                    {visibleReports.religions && (
                        <Card title="Religion Distribution" sub="Families grouped by religion">
                            {d.religions.length > 0
                                ? <ReactECharts option={pieOption(d.religions, "Religions")} style={{ height: 240 }} />
                                : <EmptyChart message="No religion data" />}
                        </Card>
                    )}
                </div>
            </CollapsibleSection>

            {/* ── EDUCATION SECTION ──────────────────────────────────── */}
            <CollapsibleSection
                icon="🎓"
                title="Education"
                isOpen={openSections.education}
                onToggle={() => toggleSection("education")}
                visibleReports={visibleReports}
                onToggleReport={toggleReport}
                reports={[
                    { key: "education", label: "Education Programs" },
                ]}
            >
                <Card title="Education Programs" sub="People enrolled in or completed various education programs">
                    {d.education.length > 0
                        ? <ReactECharts option={barOption(d.education)} style={{ height: 260 }} />
                        : <EmptyChart message="No education data" />}
                </Card>
            </CollapsibleSection>

            {/* ── GEOGRAPHY SECTION ──────────────────────────────────── */}
            <CollapsibleSection
                icon="🗺️"
                title="Geography"
                isOpen={openSections.geography}
                onToggle={() => toggleSection("geography")}
                visibleReports={visibleReports}
                onToggleReport={toggleReport}
                reports={[
                    { key: "wards", label: "Household Count by Ward" },
                ]}
            >
                <Card title="Household Count by Ward" sub="Number of toles / households registered per ward">
                    {d.wards.length > 0
                        ? <ReactECharts option={barOption(d.wards)} style={{ height: 260 }} />
                        : <EmptyChart message="No ward data" />}
                </Card>
            </CollapsibleSection>

            {/* footer timestamp */}
            <p style={{ color: "#cbd5e1", fontSize: "11px", textAlign: "right", margin: "8px 0 0", fontFamily: "Nunito, sans-serif" }}>
                Last refreshed: {new Date(data.timestamp).toLocaleString()}
            </p>

        </section>
    );
}