import {
  Check,
  ChevronDown,
  Download,
  Filter,
  Globe,
  MapPin,
  Search,
  Pencil,
  Phone,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cva } from "class-variance-authority";

import cn from "@shared/lib";
import { useSearchMunicipalities, useWardsByMunicipality } from "../api";
import type { Ward } from "../model";
import { WardAddForm } from "./WardAddForm";
import { WardDeleteConfirmBox } from "./WardDeleteConfirmBox";
import { WardEditForm } from "./WardEditForm";

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
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState("");
  const [selectedMunicipalityName, setSelectedMunicipalityName] = useState("");
  const [municipalitySearch, setMunicipalitySearch] = useState("");
  const [isMunicipalityDropdownOpen, setIsMunicipalityDropdownOpen] =
    useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const municipalitySelectRef = useRef<HTMLDivElement | null>(null);
  const {
    data: municipalityResults = [],
    isLoading: isMunicipalitySearchLoading,
    isError: isMunicipalitySearchError,
  } = useSearchMunicipalities(municipalitySearch);
  const {
    data: wards = [],
    isLoading: isWardsLoading,
    isError: isWardsError,
  } = useWardsByMunicipality(selectedMunicipalityId);
  const isMunicipalitySelected = Boolean(selectedMunicipalityId);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        municipalitySelectRef.current &&
        !municipalitySelectRef.current.contains(event.target as Node)
      ) {
        setIsMunicipalityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const searchedMunicipalities = useMemo(
    () => municipalityResults,
    [municipalityResults],
  );

  return (
    <section className="mx-auto w-full max-w-290 space-y-8 pb-6">
      <header className="space-y-3 border-b border-[#121B2D] pb-7">
        <h1 className="text-3xl font-extrabold leading-none tracking-[-0.01em] text-[#E6EAF5]">
          Ward Configuration
          {selectedMunicipalityName && (
            <span className="text-[#3F5FF0]"> for {selectedMunicipalityName}</span>
          )}
        </h1>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#A4ABBC]">
          <MapPin className="h-4 w-4" />
          Administrative Registry • Koshi Province
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          ref={municipalitySelectRef}
          className="relative min-w-75 max-w-75 flex-1"
        >
          <button
            type="button"
            onClick={() => setIsMunicipalityDropdownOpen((prev) => !prev)}
            className="flex h-14 w-full items-center justify-between rounded-xl border border-[#2A4CF4] bg-[#1E2433] px-4 text-left text-sm font-semibold text-[#DDE2EF] outline-none transition-colors hover:border-[#3A57EE]"
          >
            <span className="truncate">
              {selectedMunicipalityName || "Search Municipality"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-[#8088A0] transition-transform",
                isMunicipalityDropdownOpen && "rotate-180",
              )}
            />
          </button>

          {isMunicipalityDropdownOpen && (
            <div className="absolute z-20 mt-2 w-full rounded-xl border border-[#2A3143] bg-[#141B29] p-3 shadow-[0_16px_38px_rgba(2,8,22,0.6)]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C859B]" />
                <input
                  autoFocus
                  value={municipalitySearch}
                  onChange={(event) => setMunicipalitySearch(event.target.value)}
                  placeholder="Type municipality name..."
                  className="h-11 w-full rounded-lg border border-[#2A3143] bg-[#1B2231] pl-10 pr-3 text-sm font-medium text-[#DDE2EF] outline-none transition-colors placeholder:text-[#7B8499] focus:border-[#4562F3]"
                />
              </div>

              <div className="mt-3 max-h-56 overflow-y-auto rounded-lg border border-[#212A3D] bg-[#181F2D]">
                {!municipalitySearch.trim() ? (
                  <p className="px-3 py-4 text-sm font-medium text-[#8D95AA]">
                    Type municipality name to search.
                  </p>
                ) : isMunicipalitySearchLoading ? (
                  <p className="px-3 py-4 text-sm font-medium text-[#8D95AA]">
                    Searching municipalities...
                  </p>
                ) : isMunicipalitySearchError ? (
                  <p className="px-3 py-4 text-sm font-medium text-[#D9A3A3]">
                    Unable to fetch municipalities.
                  </p>
                ) : searchedMunicipalities.length > 0 ? (
                  searchedMunicipalities.map((municipality) => {
                    const isSelected = selectedMunicipalityId === municipality.id;

                    return (
                      <button
                        key={municipality.id}
                        type="button"
                        onClick={() => {
                          setSelectedMunicipalityId(municipality.id);
                          setSelectedMunicipalityName(municipality.nameEn);
                          setMunicipalitySearch(municipality.nameEn);
                          setIsMunicipalityDropdownOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between border-b border-[#222B3E] px-3 py-2.5 text-left text-sm font-semibold text-[#D7DCE9] transition-colors last:border-b-0 hover:bg-[#242C3E]",
                          isSelected && "bg-[#202A42] text-white",
                        )}
                      >
                        <span className="truncate">{municipality.nameEn}</span>
                        {isSelected && <Check className="h-4 w-4 text-[#5A77FF]" />}
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-4 text-sm font-medium text-[#8D95AA]">
                    No municipality found.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={cn(
              actionButton(),
              !isMunicipalitySelected && "cursor-not-allowed opacity-50 hover:bg-[#1F2533]",
            )}
            disabled={!isMunicipalitySelected}
          >
            <Filter className="h-4 w-4" />
            FILTER
          </button>
          <button
            type="button"
            className={cn(
              actionButton(),
              !isMunicipalitySelected && "cursor-not-allowed opacity-50 hover:bg-[#1F2533]",
            )}
            disabled={!isMunicipalitySelected}
          >
            <Download className="h-4 w-4" />
            EXPORT
          </button>
          <button
            type="button"
            className={cn(
              actionButton({ variant: "primary" }),
              !isMunicipalitySelected && "cursor-not-allowed opacity-50 hover:bg-[#4562F3]",
            )}
            onClick={() => {
              if (!isMunicipalitySelected) {
                return;
              }
              setIsAddModalOpen(true);
            }}
            disabled={!isMunicipalitySelected}
          >
            <Plus className="h-4 w-4" />
            ADD NEW WARD
          </button>
        </div>
      </div>

      {!selectedMunicipalityId && (
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

      {selectedMunicipalityId && (
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
                  {isWardsLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm font-medium text-[#8D95AA]"
                      >
                        Loading wards...
                      </td>
                    </tr>
                  ) : isWardsError ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm font-medium text-[#D9A3A3]"
                      >
                        Unable to fetch wards for selected municipality.
                      </td>
                    </tr>
                  ) : wards.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm font-medium text-[#8D95AA]"
                      >
                        No wards found for selected municipality.
                      </td>
                    </tr>
                  ) : (
                    wards.map((ward, index) => (
                      <tr
                        key={ward.id}
                        className={cn(
                          "border-b border-[#252D3F] text-[#D9DEEA] last:border-b-0",
                          index % 2 === 0 ? "bg-[#202734]" : "bg-[#1D2431]",
                        )}
                      >
                        <td className="px-6 py-8 text-sm font-semibold text-[#757E93]">
                          {String(ward.number).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-8">
                          <div className="space-y-2">
                            <p className="text-base font-semibold leading-tight tracking-tight text-[#E5E9F3]">
                              Ward No. {ward.number}
                            </p>
                            <span className="inline-flex items-center rounded-md border border-[#364058] bg-[#242D3F] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#AEB8CD]">
                              Local Unit
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-8">
                          <div className="flex items-center gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#353D4F] text-[#A6AEC3]">
                              <UserRound className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold tracking-tight text-[#E5E9F3]">
                                {ward.representativeNameEn || "-"}
                              </p>
                              <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-[#3D5FEF]">
                                {ward.representativeNameNe || "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-8">
                          <div className="space-y-3">
                            <p className="flex items-center gap-3 text-sm text-[#D7DCE8]">
                              <Phone className="h-4 w-4 text-[#9CA4B7]" />
                              {ward.phoneNo || "-"}
                            </p>
                            <p className="flex items-center gap-3 text-xs text-[#8D95AA]">
                              <Globe className="h-4 w-4 text-[#7D869B]" />
                              {ward.email || "-"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-8">
                          <div className="flex items-center justify-end gap-4">
                            <button
                              type="button"
                              className="rounded-lg p-2 text-[#AAB2C7] transition-colors hover:bg-[#2E3649] hover:text-white"
                              onClick={() => {
                                setSelectedWard(ward);
                                setIsEditModalOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-lg p-2 text-[#AAB2C7] transition-colors hover:bg-[#3A2A36] hover:text-[#F2A7B3]"
                              onClick={() => {
                                setSelectedWard(ward);
                                setIsDeleteConfirmOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#767E93]">
              Showing {wards.length} Registered Wards
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
            municipalityId={selectedMunicipalityId}
            municipalityName={selectedMunicipalityName}
            onClose={() => setIsAddModalOpen(false)}
            onDismiss={() => setIsAddModalOpen(false)}
            onConfirm={() => setIsAddModalOpen(false)}
          />
        </div>
      )}

      {isEditModalOpen && selectedWard && (
        <div className="fixed inset-0 z-50 overflow-y-hidden bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
          <WardEditForm
            className="bg-transparent p-0 md:p-0"
            wardId={selectedWard.id}
            municipalityId={selectedMunicipalityId}
            initialNumber={selectedWard.number}
            initialRepresentativeNameEn={selectedWard.representativeNameEn}
            initialRepresentativeNameNe={selectedWard.representativeNameNe}
            initialPhone={selectedWard.phoneNo || ""}
            initialEmail={selectedWard.email || ""}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedWard(null);
            }}
            onDismiss={() => {
              setIsEditModalOpen(false);
              setSelectedWard(null);
            }}
            onConfirm={() => {
              setIsEditModalOpen(false);
              setSelectedWard(null);
            }}
          />
        </div>
      )}

      {isDeleteConfirmOpen && selectedWard && (
        <div className="fixed inset-0 z-50 bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
          <WardDeleteConfirmBox
            ward={selectedWard}
            municipalityId={selectedMunicipalityId}
            onClose={() => {
              setIsDeleteConfirmOpen(false);
              setSelectedWard(null);
            }}
            onDismiss={() => {
              setIsDeleteConfirmOpen(false);
              setSelectedWard(null);
            }}
            onConfirm={() => {
              setIsDeleteConfirmOpen(false);
              setSelectedWard(null);
            }}
          />
        </div>
      )}
    </section>
  );
}
