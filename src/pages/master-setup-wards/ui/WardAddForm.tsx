import { useState } from "react";

import { cva } from "class-variance-authority";
import { Save, ShieldPlus, X } from "lucide-react";

import cn from "@shared/lib";
import { useCreateWard } from "../api";
import type { CreateWardPayload } from "../model";

const actionButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        ghost: "text-(--mis-color-ink-700) hover:text-(--mis-color-ink-900)",
        primary:
          "bg-(--mis-color-pri-500) text-white shadow-(--mis-shadow-focus) hover:bg-(--mis-color-pri-600)",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  },
);

const fieldClass =
  "h-14 w-full rounded-xl border border-(--mis-color-ink-300) bg-(--mis-color-white) px-4 text-sm text-(--mis-color-ink-800) placeholder:text-(--mis-color-ink-500) outline-none transition-colors focus:border-(--mis-color-pri-600)";

interface WardAddFormProps {
  className?: string;
  municipalityId: string;
  municipalityName?: string;
  onClose?: () => void;
  onDismiss?: () => void;
  onConfirm?: () => void;
}

export function WardAddForm({
  className,
  municipalityId,
  municipalityName,
  onClose,
  onDismiss,
  onConfirm,
}: WardAddFormProps) {
  const [number, setNumber] = useState("");
  const [representativeNameEn, setRepresentativeNameEn] = useState("");
  const [representativeNameNe, setRepresentativeNameNe] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const { mutateAsync: createWard, isPending } = useCreateWard();
  const inheritedMunicipality = (municipalityName ?? "").trim();
  const isFormValid =
    municipalityId.trim().length > 0 &&
    Number.isInteger(Number(number)) &&
    Number(number) >= 1 &&
    Number(number) <= 999 &&
    representativeNameEn.trim().length > 0 &&
    representativeNameNe.trim().length > 0;

  const handleClose = () => {
    onClose?.();
  };

  const handleDismiss = () => {
    onDismiss?.();
    onClose?.();
  };

  const handleSubmit = async () => {
    setFormError("");

    if (!municipalityId) {
      setFormError("Please select a municipality before creating a ward.");
      return;
    }

    const wardNumber = Number(number);
    if (!Number.isInteger(wardNumber) || wardNumber < 1 || wardNumber > 999) {
      setFormError("Ward number must be an integer between 1 and 999.");
      return;
    }

    if (!representativeNameEn.trim() || !representativeNameNe.trim()) {
      setFormError("Representative name in both EN and NE is required.");
      return;
    }

    const payload: CreateWardPayload = {
      number: wardNumber,
      municipalityId,
      representativeNameEn: representativeNameEn.trim(),
      representativeNameNe: representativeNameNe.trim(),
      phoneNo: phone.trim() || undefined,
      email: email.trim() || undefined,
    };

    try {
      await createWard(payload);
      onConfirm?.();
      onClose?.();
    } catch (error) {
      console.error("Failed to create ward:", error);
      setFormError("Failed to create ward. Please try again.");
    }
  };

  return (
    <section
      className={cn("min-h-screen h-dvh overflow-hidden p-5 md:p-8", className)}
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-(--mis-color-ink-200) bg-(--mis-color-white) shadow-(--mis-shadow-lg)">
        <header className="flex items-start justify-between border-b border-(--mis-color-ink-200) px-8 py-8 md:px-10">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-(--mis-color-pri-500) bg-(--mis-color-pri-50) text-(--mis-color-pri-600)">
              <ShieldPlus className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold leading-none tracking-[-0.02em] text-(--mis-color-ink-900)">
                Add New Ward Entity
              </h1>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--mis-color-ink-500)">
                New Registry Entry
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="rounded-lg p-2 text-(--mis-color-ink-600) transition-colors hover:bg-(--mis-color-ink-100) hover:text-(--mis-color-ink-900)"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
          className="space-y-8 px-8 py-8 md:px-10 md:py-10"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-7">
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-500)">
                Municipality
              </label>
              <input
                type="text"
                readOnly
                value={inheritedMunicipality}
                placeholder="Inherited from ward page selection"
                className={fieldClass}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-500)">
                Ward Number
              </label>
              <input
                type="number"
                min={1}
                max={999}
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                placeholder="e.g. 1"
                className={fieldClass}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-500)">
                Representative Name (EN)
              </label>
              <input
                type="text"
                value={representativeNameEn}
                onChange={(event) =>
                  setRepresentativeNameEn(event.target.value)
                }
                placeholder="Full Name"
                className={fieldClass}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-500)">
                Representative Name (NE)
              </label>
              <input
                type="text"
                value={representativeNameNe}
                onChange={(event) =>
                  setRepresentativeNameNe(event.target.value)
                }
                placeholder="पूरा नाम"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-7">
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-500)">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="e.g. +977-..."
                className={fieldClass}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-(--mis-color-ink-500)">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ward@bhadrapur.gov.np"
                className={fieldClass}
              />
            </div>
          </div>

          {formError && (
            <p className="rounded-lg border border-(--mis-color-error-100) bg-(--mis-color-error-50) px-4 py-3 text-sm font-medium text-(--mis-color-error-600)">
              {formError}
            </p>
          )}
        </form>

        <footer className="flex flex-wrap items-center justify-end gap-4 border-t border-(--mis-color-ink-200) px-8 py-8 md:px-10">
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(actionButtonVariants({ variant: "ghost" }))}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || !isFormValid}
            className={cn(
              actionButtonVariants({ variant: "primary" }),
              (isPending || !isFormValid) && "cursor-not-allowed opacity-70",
              "min-w-74",
            )}
          >
            <Save className="h-4 w-4" />
            {isPending ? "Saving..." : "Register Ward Entity"}
          </button>
        </footer>
      </div>
    </section>
  );
}

export default WardAddForm;
