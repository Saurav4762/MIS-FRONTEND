import {
  ChevronDown,
  Download,
  Filter,
  Globe,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cva } from "class-variance-authority";

import cn from "@shared/lib";
import { WardAddForm } from "./WardAddForm";
import { WardEditForm } from "./WardEditForm";

interface WardRow {
  id: number;
  wardNo: string;
  wardName: string;
  wardNameNe: string;
  representative: string;
  representativeTitle: string;
  phone: string;
  website: string;
}

const municipalities = [
  "Bhadrapur Municipality",
  "Mechinagar Municipality",
  "Damak Municipality",
];

const wardsByMunicipality: Record<string, WardRow[]> = {
  "Bhadrapur Municipality": [
    {
      id: 1,
      wardNo: "01",
      wardName: "Ward No. 1",
      wardNameNe: "वडा नं. १",
      representative: "Bikram Shrestha",
      representativeTitle: "WARD CHAIRMAN",
      phone: "9851012345",
      website: "ward1.gov.np",
    },
    {
      id: 2,
      wardNo: "02",
      wardName: "Ward No. 2",
      wardNameNe: "वडा नं. २",
      representative: "Anita Rai",
      representativeTitle: "WARD CHAIRMAN",
      phone: "9851055443",
      website: "ward2.gov.np",
    },
  ],
  "Mechinagar Municipality": [
    {
      id: 1,
      wardNo: "01",
      wardName: "Ward No. 1",
      wardNameNe: "वडा नं. १",
      representative: "Kiran Adhikari",
      representativeTitle: "WARD CHAIRMAN",
      phone: "9851002244",
      website: "ward1.mechi.gov.np",
    },
  ],
  "Damak Municipality": [
    {
      id: 1,
      wardNo: "01",
      wardName: "Ward No. 1",
      wardNameNe: "वडा नं. १",
      representative: "Sushil Karki",
      representativeTitle: "WARD CHAIRMAN",
      phone: "9841022334",
      website: "ward1.damak.gov.np",
    },
  ],
};

const actionButton = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#2A3143] bg-[#1F2533] px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#C2C8D8] transition-colors hover:bg-[#252D3F]",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-[#4562F3] text-white shadow-[0_0_24px_rgba(69,98,243,0.45)] hover:bg-[#506CF7]",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function MasterSetupWardsPage() {
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const wards = useMemo(
    () => wardsByMunicipality[selectedMunicipality] ?? [],
    [selectedMunicipality],
  );

  return (
    <section className="mx-auto w-full max-w-290 space-y-8 pb-6">
      <header className="space-y-3 border-b border-[#121B2D] pb-7">
        <h1 className="text-3xl font-extrabold leading-none tracking-[-0.01em] text-[#E6EAF5]">
          Ward Configuration
          {selectedMunicipality && (
            <span className="text-[#3F5FF0]"> for {selectedMunicipality}</span>
          )}
        </h1>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#A4ABBC]">
          <MapPin className="h-4 w-4" />
          Administrative Registry • Koshi Province
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative min-w-75 max-w-75 flex-1">
          <select
            value={selectedMunicipality}
            onChange={(event) => setSelectedMunicipality(event.target.value)}
            className="h-14 w-full appearance-none rounded-xl border border-[#2A4CF4] bg-[#1E2433] px-4 pr-11 text-sm font-semibold text-[#DDE2EF] outline-none transition-colors focus:border-[#4562F3]"
          >
            <option value="">Select Municipality</option>
            {municipalities.map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8088A0]" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={cn(actionButton())}>
            <Filter className="h-4 w-4" />
            FILTER
          </button>
          <button type="button" className={cn(actionButton())}>
            <Download className="h-4 w-4" />
            EXPORT
          </button>
          <button
            type="button"
            className={cn(actionButton({ variant: "primary" }))}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            ADD NEW WARD
          </button>
        </div>
      </div>

      {!selectedMunicipality && (
        <div className="grid min-h-104 place-items-center rounded-3xl border border-dashed border-[#1E2840] bg-[#070F1F] px-8 text-center">
          <div className="space-y-5">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#1E2431] text-[#677089]">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#E4E9F5]">
              Select a Municipality to View Wards
            </h2>
            <p className="mx-auto max-w-205 text-sm font-medium leading-relaxed text-[#929AAF]">
              Please choose a municipality from the dropdown above to manage its
              ward configuration and view registered inventory.
            </p>
          </div>
        </div>
      )}

      {selectedMunicipality && (
        <>
          <div className="overflow-hidden rounded-2xl border border-[#262D3E] bg-[#1C2230]">
            <div className="overflow-x-auto">
              <table className="min-w-255 w-full">
                <thead>
                  <tr className="border-b border-[#2A3144] text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#AEB5C8]">
                    <th className="px-6 py-7 w-px whitespace-nowrap">#</th>
                    <th className="px-6 py-7">Locale &amp; Designation</th>
                    <th className="px-6 py-7">Representative</th>
                    <th className="px-6 py-7">Contact Detail</th>
                    <th className="px-6 py-7 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wards.map((ward, index) => (
                    <tr
                      key={ward.id}
                      className={cn(
                        "border-b border-[#252D3F] text-[#D9DEEA] last:border-b-0",
                        index % 2 === 0 ? "bg-[#202734]" : "bg-[#1D2431]",
                      )}
                    >
                      <td className="px-6 py-8 text-sm font-semibold text-[#757E93]">
                        {ward.wardNo}
                      </td>
                      <td className="px-6 py-8">
                        <p className="text-sm font-semibold tracking-tight text-[#E5E9F3]">
                          {ward.wardName}
                        </p>
                        <p className="mt-2 text-xs text-[#8D95AA]">
                          {ward.wardNameNe}
                        </p>
                      </td>
                      <td className="px-6 py-8">
                        <div className="flex items-center gap-4">
                          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#353D4F] text-[#A6AEC3]">
                            <UserRound className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold tracking-tight text-[#E5E9F3]">
                              {ward.representative}
                            </p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#3D5FEF]">
                              {ward.representativeTitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-8">
                        <div className="space-y-3">
                          <p className="flex items-center gap-3 text-sm text-[#D7DCE8]">
                            <Phone className="h-4 w-4 text-[#9CA4B7]" />
                            {ward.phone}
                          </p>
                          <p className="flex items-center gap-3 text-xs text-[#8D95AA]">
                            <Globe className="h-4 w-4 text-[#7D869B]" />
                            {ward.website}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-8">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            type="button"
                            className="rounded-lg p-2 text-[#AAB2C7] transition-colors hover:bg-[#2E3649] hover:text-white"
                            onClick={() => setIsEditModalOpen(true)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="rounded-lg bg-[#3A333D] p-2 text-[#E7A49D] transition-colors hover:bg-[#4A3D4B]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#767E93]">
              Showing 2 of 12 Registered Wards
            </p>

            <div className="ml-auto flex items-center gap-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#AFB6C8]">
              <button type="button" className="hover:text-white">
                Prev
              </button>
              <button
                type="button"
                className="grid h-10 min-w-10 place-items-center rounded-md bg-[#4562F3] px-3 text-white shadow-[0_0_18px_rgba(69,98,243,0.45)]"
              >
                1
              </button>
              <button type="button" className="hover:text-white">
                2
              </button>
              <button type="button" className="hover:text-white">
                3
              </button>
              <button type="button" className="hover:text-white">
                Next
              </button>
            </div>
          </footer>
        </>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-hidden bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
          <WardAddForm
            className="bg-transparent p-0 md:p-0"
            onClose={() => setIsAddModalOpen(false)}
            onDismiss={() => setIsAddModalOpen(false)}
            onConfirm={() => setIsAddModalOpen(false)}
          />
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-hidden bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
          <WardEditForm
            className="bg-transparent p-0 md:p-0"
            onClose={() => setIsEditModalOpen(false)}
            onDismiss={() => setIsEditModalOpen(false)}
            onConfirm={() => setIsEditModalOpen(false)}
          />
        </div>
      )}
    </section>
  );
}
