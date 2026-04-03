import { cva } from "class-variance-authority";
import { Building2, Globe, Save, X } from "lucide-react";

import cn from "@shared/lib";

const actionButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        ghost: "text-[#B1B7C7] hover:text-white",
        primary:
          "bg-[#4B62FF] text-white shadow-[0_0_20px_rgba(75,98,255,0.4)] hover:bg-[#5A70FF]",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  },
);

const fieldClass =
  "h-14 w-full rounded-xl border border-[#3A4152] bg-[#343A47] px-4 text-sm text-[#CFD3E1] placeholder:text-[#7D8496] outline-none transition-colors focus:border-[#5A70FF]";

interface MunicipalityAddProps {
  className?: string;
  onClose?: () => void;
  onDismiss?: () => void;
  onConfirm?: () => void;
}

interface FieldProps {
  label: string;
  placeholder: string;
  className?: string;
  startIcon?: React.ReactNode;
}

function Field({ label, placeholder, className, startIcon }: FieldProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#B7BDCB]">
        {label}
      </label>
      <div className="relative">
        {startIcon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8D94A8]">
            {startIcon}
          </span>
        )}
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          className={cn(fieldClass, startIcon && "pl-11")}
        />
      </div>
    </div>
  );
}

export function MunicipalityAdd({
  className,
  onClose,
  onDismiss,
  onConfirm,
}: MunicipalityAddProps) {
  const handleClose = () => {
    onClose?.();
  };

  const handleDismiss = () => {
    onDismiss?.();
    onClose?.();
  };

  return (
    <section
      className={cn(
        "min-h-screen h-dvh overflow-hidden bg-[#040B18] p-5 md:p-8",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#242C3E] bg-[#1A1F2B] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <header className="flex items-start justify-between border-b border-[#232B3E] px-16 py-8 md:px-10">
          <div className="flex items-center gap-5">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-[#2F4AFF] bg-[#1F2B4A] text-[#4D67FF]">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold leading-none tracking-[-0.025em] text-[#E8EBF3]">
                Municipality Entity
              </h1>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#A1A8BA]">
                Sovereign Registry Entry
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="rounded-lg p-2 text-[#C5CBD8] transition-colors hover:bg-[#2B3245] hover:text-white"
          >
            <X className="h-7 w-7" />
          </button>
        </header>

        <div className="h-104 grid grid-cols-2 gap-x-5 gap-y-8 overflow-y-scroll px-8 py-20 md:grid-cols-2 md:px-12 md:py-12">
          <Field
            label="Municipality Name (EN)"
            placeholder="Kathmandu Metropolitan City"
          />
          <Field
            label="नगरपालिकाको नाम (NE)"
            placeholder="काठमाडौँ महानगरपालिका"
          />
          <Field label="Mayor / Chief (EN)" placeholder="Executive Head Name" />
          <Field label="प्रमुखको नाम (NE)" placeholder="पूरा नाम नेपालीमा" />
          <Field label="Email Address" placeholder="info@municipality.gov.np" />
          <Field label="Phone Number" placeholder="+977-XX-XXXXXXX" />
          <Field
            className="md:col-span-2"
            label="Official Website Url"
            placeholder="https://www.municipality.gov.np"
            startIcon={<Globe className="h-5 w-5" />}
          />
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-4 border-t border-[#232B3E] px-8 py-8 md:px-10">
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(actionButtonVariants({ variant: "ghost" }))}
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              actionButtonVariants({ variant: "primary" }),
              "min-w-60",
            )}
          >
            <Save className="h-4 w-4" />
            Confirm Registry
          </button>
        </footer>
      </div>
    </section>
  );
}

export default MunicipalityAdd;
