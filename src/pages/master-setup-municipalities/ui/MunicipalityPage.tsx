import {
  Download,
  Filter,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { cva } from "class-variance-authority";

import cn from "@shared/lib";
import { MunicipalityAddForm } from "./MunicipalityAddForm";
import { MunicipalityEditForm } from "./MunicipalityEditForm";
import { useMunicipalities } from "../api";
import type { Municipality } from "../model";

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
          "gap-2 rounded-lg border border-[#2A3244] bg-[#1B2130] px-3 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#C9CFDE] hover:bg-[#242C40]",
        primary:
          "gap-2 rounded-lg bg-[#4B62FF] px-3 py-2.5 text-xs font-semibold tracking-[0.08em] text-white hover:bg-[#546CFF]",
        icon: "rounded-lg p-2 text-[#8990A2] hover:bg-[#2B3244] hover:text-[#A6AEBD]",
        pagination:
          "font-semibold uppercase tracking-[0.15em] text-[#AFB5C5] hover:text-white",
        paginationActive:
          "h-10 min-w-10 rounded-md bg-[#4B62FF] px-3 font-semibold uppercase tracking-[0.15em] text-white shadow-[0_0_18px_rgba(75,98,255,0.45)]",
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
  const { data } = useMunicipalities();

  if (!data) {
    return null;
  }

  const municipalities = (data ?? []) as Municipality[];

  return (
    <>
      <section className="mx-auto w-full max-w-290 space-y-8 pb-5">
        <header className="space-y-3.5">
          <h1 className="text-3xl font-extrabold leading-none tracking-[-0.01em] text-[#E8ECF8]">
            Municipality Configuration
          </h1>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#8D93A5]">
            <MapPin className="h-4 w-4" />
            Administrative Registry • National Overview
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex min-w-75 max-w-75 flex-1 items-center gap-3 rounded-xl border border-[#222A3C] bg-[#181E2B] px-4 py-3 text-[#9198AC] focus-within:border-[#3F68FF]">
            <Search className="h-5 w-5" />
            <input
              type="text"
              value=""
              readOnly
              placeholder="Search registry by name, ID or head..."
              className="w-full bg-transparent text-xs text-[#B8BED0] placeholder:text-[#6D7488] outline-none"
            />
          </label>

          <div className="ml-auto flex flex-wrap items-center gap-4">
            <button
              type="button"
              className={cn(buttonVariants({ variant: "action" }))}
            >
              <Filter className="h-4 w-4" />
              FILTER
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "action" }))}
            >
              <Download className="h-4 w-4" />
              EXPORT
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ variant: "primary" }))}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              ADD MUNICIPALITY
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#252D40] bg-[#1A202D]">
          <div className="custom-scrollbar overflow-x-auto">
            <table className="min-w-255 w-full">
              <thead>
                <tr className="border-b border-[#272F42] text-left text-xs font-semibold tracking-[0.13em] text-[#B6BDCC]">
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
                      className="border-b border-[#272F42] last:border-b-0"
                    >
                      <td className="px-6 py-8 text-sm font-semibold tracking-tight text-[#838BA0]">
                        {municipality.code}
                      </td>
                      <td className="px-6 py-8">
                        <p className="text-sm font-semibold tracking-tight text-[#E4E8F4]">
                          {municipality.nameEn}
                        </p>
                        <p className="mt-2 text-xs text-[#7E8599]">
                          {municipality.nameNe}
                        </p>
                      </td>
                      <td className="px-6 py-8">
                        <div className="flex items-center gap-4">
                          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#30384A] text-[#A8AEC1]">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold tracking-tight text-[#E4E8F4]">
                              {municipality.headExecutiveNameEn}
                            </p>
                            <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-[#5874FF]">
                              {municipality.headExecutiveNameNe}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-8">
                        <div className="space-y-3 text-xs text-[#CFD3E1]">
                          <p className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-[#737B8E]" />
                            {municipality.phoneNo}
                          </p>
                          <p className="flex items-center gap-3 text-[#7D8599]">
                            <Mail className="h-4 w-4 text-[#6D7589]" />
                            {municipality.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-8">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className={cn(buttonVariants({ variant: "icon" }))}
                            onClick={() => setIsEditModalOpen(true)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className={cn(buttonVariants({ variant: "icon" }))}
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
          <p className="text-sm font-semibold uppercase tracking-widest text-[#777F92]">
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
        <div className="fixed inset-0 z-50 overflow-y-hidden bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
          <MunicipalityAddForm
            className="bg-transparent p-0 md:p-0"
            onClose={() => setIsAddModalOpen(false)}
            onDismiss={() => setIsAddModalOpen(false)}
            onConfirm={() => setIsAddModalOpen(false)}
          />
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-hidden bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
          <MunicipalityEditForm
            className="bg-transparent p-0 md:p-0"
            onClose={() => setIsEditModalOpen(false)}
            onDismiss={() => setIsEditModalOpen(false)}
            onConfirm={() => setIsEditModalOpen(false)}
          />
        </div>
      )}
    </>
  );
}
