import type { GenderData } from "../model";

interface GenderPieChartProps {
  data: GenderData;
}

const COLORS = ["#3b82f6", "#ec4899", "#8b5cf6"];
const LABELS = ["Male", "Female", "Others"];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `Z`,
  ].join(" ");

  return d;
}

export function GenderPieChart({ data }: GenderPieChartProps) {
  const values = [data.male, data.female, data.others];
  const total = values.reduce((s, v) => s + v, 0) || 1;

  let angle = 0;

  return (
    <div className="rounded-lg border border-[#1a2742] bg-[#081428] p-6">
      <h3 className="mb-6 text-lg font-semibold text-slate-100">Population by Gender</h3>
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <svg viewBox="0 0 200 200" width="100%" height={260} className="flex-1">
          {values.map((v, i) => {
            const startAngle = angle;
            const sliceAngle = (v / total) * 360;
            const endAngle = startAngle + sliceAngle;
            const pathD = describeArc(100, 100, 80, startAngle, endAngle);
            angle = endAngle;
            return <path key={i} d={pathD} fill={COLORS[i]} stroke="#071428" strokeWidth={1} />;
          })}
        </svg>

        <div className="grid grid-cols-1 gap-3 md:w-64">
          {values.map((v, i) => (
            <div key={i} className="flex items-center justify-between rounded border border-[#1a2742] bg-[#0f172a] px-3 py-2">
              <div className="flex items-center gap-3">
                <span style={{ width: 12, height: 12, background: COLORS[i], display: "inline-block", borderRadius: 3 }} />
                <div>
                  <div className="text-sm text-slate-400">{LABELS[i]}</div>
                  <div className="text-base font-semibold text-slate-100">{v.toLocaleString()}</div>
                </div>
              </div>
              <div className="text-sm text-slate-500">{((v / total) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

