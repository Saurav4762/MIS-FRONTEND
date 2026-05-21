import { useState } from "react";

type YesNoValue = "yes" | "no" | null;

interface YesNoToggleProps {
  label: string;
  labelNepali?: string;
  value?: YesNoValue;
  onChange?: (value: YesNoValue) => void;
  disabled?: boolean;
}

export function YesNoToggle({
  label,
  labelNepali,
  value,
  onChange,
  disabled = false,
}: YesNoToggleProps) {
  const [internal, setInternal] = useState<YesNoValue>(null);
  const selected = value !== undefined ? value : internal;

  const handleSelect = (v: YesNoValue) => {
    if (disabled) return;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#1a3a5c]">
          {label}
        </span>
        {labelNepali && (
          <span className="text-[13px] text-[#4a6080]">{labelNepali}</span>
        )}
      </div>

      {/* Toggle pill */}
      <div
        className="relative flex w-52 rounded-full p-1"
        style={{
          background: "#e8eef5",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
        }}
      >
        {/* Sliding background */}
        <div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            background:
              selected === "yes"
                ? "linear-gradient(135deg, #1d6fc4, #2b87ea)"
                : selected === "no"
                  ? "#fff"
                  : "transparent",
            boxShadow: selected ? "0 2px 8px rgba(29,111,196,0.35)" : "none",
            left: selected === "no" ? "calc(50% + 4px)" : "4px",
          }}
        />

        {/* YES button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleSelect("yes")}
          className="relative z-10 flex-1 rounded-full py-2 text-sm font-bold tracking-wider transition-colors duration-200"
          style={{
            color: selected === "yes" ? "#fff" : "#7a90a8",
          }}
        >
          YES
        </button>

        {/* NO button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleSelect("no")}
          className="relative z-10 flex-1 rounded-full py-2 text-sm font-bold tracking-wider transition-colors duration-200"
          style={{
            color: selected === "no" ? "#1d6fc4" : "#7a90a8",
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
}

// ─── Demo ────────────────────────────────────────────────────────────────────

export default function App() {
  const [handwashing, setHandwashing] = useState<YesNoValue>(null);
  const [drinkingWater, setDrinkingWater] = useState<YesNoValue>(null);
  const [toiletAccess, setToiletAccess] = useState<YesNoValue>(null);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: "#f0f4f8" }}
    >
      <div
        className="bg-white rounded-2xl p-8 flex flex-col gap-7 w-full max-w-sm"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      >
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-[#7a90a8] mb-0.5">
            Household Survey
          </h2>
          <p className="text-[#1a3a5c] font-semibold text-base">
            Sanitation & Hygiene
          </p>
        </div>

        <YesNoToggle
          label="Family practices handwashing with soap?"
          labelNepali="(परिवारले साबुन पानीले हात धुने अभ्यास गर्छ?)"
          value={handwashing}
          onChange={setHandwashing}
        />

        <YesNoToggle
          label="Access to safe drinking water?"
          labelNepali="(सुरक्षित खानेपानीको पहुँच छ?)"
          value={drinkingWater}
          onChange={setDrinkingWater}
        />

        <YesNoToggle
          label="Has toilet / sanitation facility?"
          labelNepali="(शौचालय / सरसफाई सुविधा छ?)"
          value={toiletAccess}
          onChange={setToiletAccess}
        />

        <div className="pt-2">
          <button
            type="button"
            className="w-full py-3 rounded-xl text-sm font-bold tracking-wider text-white transition-opacity"
            style={{
              background: "linear-gradient(135deg, #1d6fc4, #2b87ea)",
              opacity: handwashing && drinkingWater && toiletAccess ? 1 : 0.45,
              boxShadow: "0 4px 12px rgba(29,111,196,0.3)",
            }}
          >
            SAVE RESPONSE
          </button>
        </div>
      </div>
    </div>
  );
}
