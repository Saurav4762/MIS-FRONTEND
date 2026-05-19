import { Calculator } from "lucide-react";
import type { ExpenditureSummaryProps } from "../model";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function ExpenditureSummary({ total }: ExpenditureSummaryProps) {
  return (
    <section className="flex flex-col gap-6 rounded-xl border border-pri-100 bg-pri-50 p-7 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-pri-100 bg-white text-pri-600 shadow-sm">
          <Calculator className="h-7 w-7" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-pri-700">
            Total Annual Expenditure
          </p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-pri-600">
            कुल वार्षिक खर्च
          </p>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-3xl font-black leading-none text-pri-600">
          NPR {currencyFormatter.format(total)}
        </p>
        <p className="mt-2 text-[9px] font-black uppercase tracking-[0.15em] text-pri-400">
          Calculated Automatically
        </p>
      </div>
    </section>
  );
}
