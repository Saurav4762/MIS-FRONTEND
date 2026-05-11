import {
  // Download,
  // Filter,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { cva } from "class-variance-authority";

import cn from "@shared/lib";
import { MunicipalityAddForm } from "./MunicipalityAddForm";
import { MunicipalityEditForm } from "./MunicipalityEditForm";
import { useImportMunicipalitySeed, useMunicipalities } from "../api";
import type { Municipality } from "../model";
import MunicipalityDeleteConfirmBox from "./MunicipalityDeleteConfirmBox";

// const municipalities = [
//   {
//     id: "001",
//     name: "Kathmandu Metropolitan City",
//     nepaliName: "काठमाडौँ महानगरपालिका",
//     representative: "Hon. Balendra Shah",
//     title: "EXECUTIVE MAYOR",
//     phone: "+977-1-4231481",
//     email: "info@kathmandu.gov.np",
//   },
//   {
//     id: "002",
//     name: "Lalitpur Metropolitan City",
//     nepaliName: "ललितपुर महानगरपालिका",
//     representative: "Hon. Chiri Babu Maharjan",
//     title: "EXECUTIVE MAYOR",
//     phone: "+977-1-5521257",
//     email: "lalitpur@gov.np",
//   },
//   {
//     id: "003",
//     name: "Pokhara Metropolitan City",
//     nepaliName: "पोखरा महानगरपालिका",
//     representative: "Hon. Dhan Raj Acharya",
//     title: "EXECUTIVE MAYOR",
//     phone: "+977-61-521105",
//     email: "pokhara@gov.np",
//   },
// ];

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        action:
          "gap-2 rounded-lg border border-[var(--mis-color-ink-300)] bg-[var(--mis-color-white)] px-3 py-2.5 text-xs font-semibold tracking-[0.08em] text-[var(--mis-color-ink-700)] hover:bg-[var(--mis-color-ink-100)]",
        primary:
          "gap-2 rounded-lg bg-[var(--mis-color-pri-500)] px-3 py-2.5 text-xs font-semibold tracking-[0.08em] text-white hover:bg-[var(--mis-color-pri-600)]",
        icon: "rounded-lg p-2 text-[var(--mis-color-ink-500)] hover:bg-[var(--mis-color-ink-100)] hover:text-[var(--mis-color-ink-500)]",
        pagination:
          "font-semibold uppercase tracking-[0.15em] text-[var(--mis-color-ink-600)] hover:text-[var(--mis-color-pri-600)]",
        paginationActive:
          "h-10 min-w-10 rounded-md bg-[var(--mis-color-pri-500)] px-3 font-semibold uppercase tracking-[0.15em] text-white shadow-[var(--mis-shadow-focus)]",
      },
    },
    defaultVariants: {
      variant: "action",
    },
  },
);

export function MasterSetupMunicipalityPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [selectedMunicipality, setSelectedMunicipality] =
    useState<Municipality | null>(null);
  const municipalityImportInputRef = useRef<HTMLInputElement | null>(null);

  const importMunicipalitySeedMutation = useImportMunicipalitySeed();
  const { data } = useMunicipalities();

  if (!data) {
    return null;
  }

  const municipalities = (data ?? []) as Municipality[];

  const handleOpenDeleteConfirmModal = (municipality: Municipality) => {
    setSelectedMunicipality(municipality);
    setIsDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setSelectedMunicipality(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleOpenEditModal = (municipality: Municipality) => {
    setSelectedMunicipality(municipality);
    setIsEditModalOpen(true);
  };

  const handleImportMunicipalitySeed = async (file: File) => {
    try {
      const result = await importMunicipalitySeedMutation.mutateAsync(file);
      alert(result.message ?? "Municipality seed import completed successfully.");
    } catch {
      alert("Failed to import municipality seed.");
    }
  };

  const handleImportFileSelection = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const isExcelFile = /\.(xlsx|xls)$/i.test(selectedFile.name);
    if (!isExcelFile) {
      alert("Please select a valid Excel file (.xlsx or .xls).");
      event.target.value = "";
      return;
    }

    await handleImportMunicipalitySeed(selectedFile);
    event.target.value = "";
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedMunicipality(null);
  };

  return (
    <>
      <section className="mx-auto w-full max-w-290 space-y-8 pb-5">
        <header className="space-y-3.5">
          <h1 className="text-3xl font-extrabold leading-none tracking-[-0.01em] text-[var(--mis-color-ink-900)]">
            Municipality Configuration
          </h1>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--mis-color-ink-500)]">
            <MapPin className="h-4 w-4" />
            Administrative Registry • National Overview
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex min-w-75 max-w-75 flex-1 items-center gap-3 rounded-xl border border-[var(--mis-color-ink-300)] bg-[var(--mis-color-white)] px-4 py-3 text-[var(--mis-color-ink-500)] focus-within:border-[var(--mis-color-pri-500)]">
            <Search className="h-5 w-5" />
            <input
              type="text"
              value=""
              readOnly
              placeholder="Search registry by name, ID or head..."
              className="w-full bg-transparent text-xs text-[var(--mis-color-ink-600)] placeholder:text-[var(--mis-color-ink-500)] outline-none"
            />
          </label>

          <div className="ml-auto flex flex-wrap items-center gap-4">
            <input
              ref={municipalityImportInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleImportFileSelection}
            />
            {/* <button
              type="button"
              className={cn(buttonVariants({ variant: "action" }))}
            >
              <Filter className="h-4 w-4" />
              FILTER
            </button> */}
            {/* <button
              type="button"
              className={cn(buttonVariants({ variant: "action" }))}
            >
              <Download className="h-4 w-4" />
              EXPORT
            </button> */}
            <button
              type="button"
              className={cn(buttonVariants({ variant: "primary" }))}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              ADD MUNICIPALITY
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "action" }))}
              onClick={() => municipalityImportInputRef.current?.click()}
              disabled={importMunicipalitySeedMutation.isPending}
            >
              <Upload className="h-4 w-4" />
              {importMunicipalitySeedMutation.isPending
                ? "IMPORTING..."
                : "IMPORT MUNICIPALITIES"}
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--mis-color-ink-200)] bg-[var(--mis-color-white)]">
          <div className="custom-scrollbar overflow-x-auto">
            <table className="min-w-255 w-full">
              <thead>
                <tr className="border-b border-[var(--mis-color-ink-200)] text-left text-xs font-semibold tracking-[0.13em] text-[var(--mis-color-ink-500)]">
                  <th className="px-6 py-7 w-px whitespace-nowrap">ID</th>
                  <th className="px-6 py-7">ENTITY IDENTITY</th>
                  <th className="px-6 py-7">REPRESENTATIVE</th>
                  <th className="px-6 py-7">CONTACT POINTS</th>
                  <th className="px-6 py-7 w-px whitespace-nowrap">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {municipalities.map((row) => {
                  const municipality = row as Municipality;

                  return (
                    <tr
                      key={municipality.id}
                      className="border-b border-[var(--mis-color-ink-200)] last:border-b-0"
                    >
                      <td className="px-6 py-8 text-sm font-semibold tracking-tight text-[var(--mis-color-ink-500)]">
                        {municipality.code}
                      </td>
                      <td className="px-6 py-8 max-w-50">
                        <p className="text-sm max-w-full whitespace-nowrap overflow-hidden text-ellipsis font-semibold tracking-tight text-[var(--mis-color-ink-900)]">
                          {municipality.nameEn}
                        </p>
                        <p className="mt-2 text-xs text-[var(--mis-color-ink-500)] max-w-full whitespace-nowrap overflow-hidden text-ellipsis ">
                          {municipality.nameNe}
                        </p>
                      </td>
                      <td className="px-6 py-8">
                        <div className="flex items-center gap-4">
                          <div className="grid h-12 w-12 min-w-12 min-h-12 place-items-center rounded-xl bg-[var(--mis-color-ink-100)] text-[var(--mis-color-ink-500)]">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="max-w-50">
                            <p className="text-sm font-semibold tracking-tight text-[var(--mis-color-ink-900)] max-w-full whitespace-nowrap overflow-hidden text-ellipsis ">
                              {municipality.headExecutiveNameEn}
                            </p>
                            <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-[var(--mis-color-pri-600)] max-w-full whitespace-nowrap overflow-hidden text-ellipsis ">
                              {municipality.headExecutiveNameNe}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-8">
                        <div className="space-y-3 text-xs text-[var(--mis-color-ink-800)]">
                          <p className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-[var(--mis-color-ink-500)]" />
                            {municipality.phoneNo}
                          </p>
                          <p className="flex items-center gap-3 text-[var(--mis-color-ink-500)] max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                            <Mail className="h-4 w-4 text-[var(--mis-color-ink-500)]" />
                            {municipality.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-8">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className={cn(buttonVariants({ variant: "icon" }))}
                            onClick={() => handleOpenEditModal(municipality)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className={cn(buttonVariants({ variant: "icon" }))}
                            onClick={() => handleOpenDeleteConfirmModal(row)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--mis-color-ink-500)]">
            Inventory: 3 of 142 Total Entries
          </p>

          <div className="ml-auto flex items-center gap-5 text-[13px]">
            <button
              type="button"
              className={cn(buttonVariants({ variant: "pagination" }))}
            >
              Prev
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "paginationActive" }))}
            >
              1
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "pagination" }))}
            >
              2
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "pagination" }))}
            >
              3
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "pagination" }))}
            >
              Next
            </button>
          </div>
        </footer>
      </section>

      {isAddModalOpen && (
        <div className="mis-modal-overlay fixed inset-0 z-50 overflow-y-hidden p-4 backdrop-blur-[2px] md:p-8">
          <MunicipalityAddForm
            className="bg-transparent p-0 md:p-0"
            onClose={() => setIsAddModalOpen(false)}
            onDismiss={() => setIsAddModalOpen(false)}
            onConfirm={() => setIsAddModalOpen(false)}
          />
        </div>
      )}

      {isEditModalOpen && (
        <div className="mis-modal-overlay fixed inset-0 z-50 overflow-y-hidden p-4 backdrop-blur-[2px] md:p-8">
          <MunicipalityEditForm
            municipality={selectedMunicipality}
            className="bg-transparent p-0 md:p-0"
            onClose={handleCloseEditModal}
            onDismiss={handleCloseEditModal}
            onConfirm={handleCloseEditModal}
          />
        </div>
      )}
      {isDeleteConfirmOpen && (
        <div className="mis-modal-overlay fixed inset-0 z-50 p-4 backdrop-blur-[2px] md:p-8">
          <MunicipalityDeleteConfirmBox
            municipality={selectedMunicipality}
            onClose={() => handleCloseDeleteConfirmModal()}
            onDismiss={() => handleCloseDeleteConfirmModal()}
            onConfirm={() => handleCloseDeleteConfirmModal()}
          />
        </div>
      )}
    </>
  );
}

