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
  "inline-flex items-center justify-center gap-2 rounded-lg border border-(--mis-color-ink-300) bg-(--mis-color-white) px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-700) transition-colors hover:bg-(--mis-color-ink-200)",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-(--mis-color-pri-500) text-white shadow-(--mis-shadow-focus) hover:bg-(--mis-color-pri-600)",
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
      <header className="space-y-3 border-b border-(--mis-color-ink-200) pb-7">
        <h1 className="text-3xl font-extrabold leading-none tracking-[-0.01em] text-(--mis-color-ink-900)">
          Ward Configuration
          {selectedMunicipalityName && (
            <span className="text-(--mis-color-pri-600)">
              {" "}
              for {selectedMunicipalityName}
            </span>
          )}
        </h1>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-500)">
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
            className="flex h-14 w-full items-center justify-between rounded-xl border border-(--mis-color-pri-500) bg-(--mis-color-white) px-4 text-left text-sm font-semibold text-(--mis-color-ink-800) outline-none transition-colors hover:border-(--mis-color-pri-600)"
          >
            <span className="truncate">
              {selectedMunicipalityName || "Search Municipality"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-(--mis-color-ink-500) transition-transform",
                isMunicipalityDropdownOpen && "rotate-180",
              )}
            />
          </button>

          {isMunicipalityDropdownOpen && (
            <div className="absolute z-20 mt-2 w-full rounded-xl border border-(--mis-color-ink-300) bg-(--mis-color-white) p-3 shadow-(--mis-shadow-lg)">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--mis-color-ink-500)" />
                <input
                  autoFocus
                  value={municipalitySearch}
                  onChange={(event) =>
                    setMunicipalitySearch(event.target.value)
                  }
                  placeholder="Type municipality name..."
                  className="h-11 w-full rounded-lg border border-(--mis-color-ink-300) bg-(--mis-color-white) pl-10 pr-3 text-sm font-medium text-(--mis-color-ink-800) outline-none transition-colors placeholder:text-(--mis-color-ink-500) focus:border-(--mis-color-pri-500)"
                />
              </div>

              <div className="mt-3 max-h-56 overflow-y-auto rounded-lg border border-(--mis-color-ink-50) bg-(--mis-color-white)">
                {!municipalitySearch.trim() ? (
                  <p className="px-3 py-4 text-sm font-medium text-(--mis-color-ink-500)">
                    Type municipality name to search.
                  </p>
                ) : isMunicipalitySearchLoading ? (
                  <p className="px-3 py-4 text-sm font-medium text-(--mis-color-ink-500)">
                    Searching municipalities...
                  </p>
                ) : isMunicipalitySearchError ? (
                  <p className="px-3 py-4 text-sm font-medium text-(--mis-color-error-600)">
                    Unable to fetch municipalities.
                  </p>
                ) : searchedMunicipalities.length > 0 ? (
                  searchedMunicipalities.map((municipality) => {
                    const isSelected =
                      selectedMunicipalityId === municipality.id;

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
                          "flex w-full items-center justify-between border-b border-(--mis-color-ink-200) px-3 py-2.5 text-left text-sm font-semibold text-(--mis-color-ink-800) transition-colors last:border-b-0 hover:bg-(--mis-color-ink-200)",
                          isSelected &&
                            "bg-(--mis-color-pri-50) text-(--mis-color-pri-700)",
                        )}
                      >
                        <span className="truncate">{municipality.nameEn}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-(--mis-color-pri-600)" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-4 text-sm font-medium text-(--mis-color-ink-500)">
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
              !isMunicipalitySelected &&
                "cursor-not-allowed opacity-50 hover:bg-(--mis-color-white)",
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
              !isMunicipalitySelected &&
                "cursor-not-allowed opacity-50 hover:bg-(--mis-color-white)",
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
              !isMunicipalitySelected &&
                "cursor-not-allowed opacity-50 hover:bg-(--mis-color-pri-500)",
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
        <div className="grid min-h-104 place-items-center rounded-3xl border border-dashed border-(--mis-color-ink-300) bg-(--mis-color-ink-50) px-8 text-center">
          <div className="space-y-5">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-(--mis-color-white) text-(--mis-color-ink-500)">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-(--mis-color-ink-900)">
              Select a Municipality to View Wards
            </h2>
            <p className="mx-auto max-w-205 text-sm font-medium leading-relaxed text-(--mis-color-ink-500)">
              Please choose a municipality from the dropdown above to manage its
              ward configuration and view registered inventory.
            </p>
          </div>
        </div>
      )}

      {selectedMunicipalityId && (
        <>
          <div className="overflow-hidden rounded-2xl border border-(--mis-color-ink-200) bg-(--mis-color-white)">
            <div className="overflow-x-auto">
              <table className="min-w-255 w-full">
                <thead>
                  <tr className="border-b border-(--mis-color-ink-300) text-left text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-600)">
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
                        className="px-6 py-10 text-center text-sm font-medium text-(--mis-color-ink-500)"
                      >
                        Loading wards...
                      </td>
                    </tr>
                  ) : isWardsError ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm font-medium text-(--mis-color-error-600)"
                      >
                        Unable to fetch wards for selected municipality.
                      </td>
                    </tr>
                  ) : wards.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm font-medium text-(--mis-color-ink-500)"
                      >
                        No wards found for selected municipality.
                      </td>
                    </tr>
                  ) : (
                    wards.map((ward, index) => (
                      <tr
                        key={ward.id}
                        className={cn(
                          "border-b border-(--mis-color-ink-200) text-(--mis-color-ink-800) last:border-b-0",
                          index % 2 === 0
                            ? "bg-(--mis-color-white)"
                            : "bg-(--mis-color-ink-50)",
                        )}
                      >
                        <td className="px-6 py-8 text-sm font-semibold text-(--mis-color-ink-500)">
                          {String(ward.number).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-8">
                          <div className="space-y-2">
                            <p className="text-base font-semibold leading-tight tracking-tight text-(--mis-color-ink-900)">
                              Ward No. {ward.number}
                            </p>
                            <span className="inline-flex items-center rounded-md border border-(--mis-color-ink-300) bg-(--mis-color-ink-50) px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-600)">
                              Local Unit
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-8">
                          <div className="flex items-center gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-(--mis-color-ink-100) text-(--mis-color-ink-500)">
                              <UserRound className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold tracking-tight text-(--mis-color-ink-900)">
                                {ward.representativeNameEn || "-"}
                              </p>
                              <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-(--mis-color-pri-600)">
                                {ward.representativeNameNe || "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-8">
                          <div className="space-y-3">
                            <p className="flex items-center gap-3 text-sm text-(--mis-color-ink-800)">
                              <Phone className="h-4 w-4 text-(--mis-color-ink-500)" />
                              {ward.phoneNo || "-"}
                            </p>
                            <p className="flex items-center gap-3 text-xs text-(--mis-color-ink-500)">
                              <Globe className="h-4 w-4 text-(--mis-color-ink-500)" />
                              {ward.email || "-"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-8">
                          <div className="flex items-center justify-end gap-4">
                            <button
                              type="button"
                              className="rounded-lg p-2 text-(--mis-color-ink-600) transition-colors hover:bg-(--mis-color-ink-100) hover:text-(--mis-color-ink-900)"
                              onClick={() => {
                                setSelectedWard(ward);
                                setIsEditModalOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-lg p-2 text-(--mis-color-ink-600) transition-colors hover:bg-(--mis-color-error-50) hover:text-(--mis-color-error-600)"
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
            <p className="text-sm font-semibold uppercase tracking-widest text-(--mis-color-ink-500)">
              Showing {wards.length} Registered Wards
            </p>

            <div className="ml-auto flex items-center gap-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-600)">
              <button
                type="button"
                className="hover:text-(--mis-color-pri-600)"
              >
                Prev
              </button>
              <button
                type="button"
                className="grid h-10 min-w-10 place-items-center rounded-md bg-(--mis-color-pri-500) px-3 text-white shadow-(--mis-shadow-focus)"
              >
                1
              </button>
              <button
                type="button"
                className="hover:text-(--mis-color-pri-600)"
              >
                2
              </button>
              <button
                type="button"
                className="hover:text-(--mis-color-pri-600)"
              >
                3
              </button>
              <button
                type="button"
                className="hover:text-(--mis-color-pri-600)"
              >
                Next
              </button>
            </div>
          </footer>
        </>
      )}

      {isAddModalOpen && (
        <div className="mis-modal-overlay fixed inset-0 z-50 overflow-y-hidden p-4 backdrop-blur-[2px] md:p-8">
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
        <div className="mis-modal-overlay fixed inset-0 z-50 overflow-y-hidden p-4 backdrop-blur-[2px] md:p-8">
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
        <div className="mis-modal-overlay fixed inset-0 z-50 p-4 backdrop-blur-[2px] md:p-8">
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
