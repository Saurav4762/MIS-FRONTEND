import { useForm } from "react-hook-form";

import { cva } from "class-variance-authority";
import { Building2, Save, X } from "lucide-react";

import cn from "@shared/lib";
import { useCreateMunicipality } from "../api";
import type { Municipality } from "../model";

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

type MunicipalityFormValues = Omit<Municipality, "id">;

interface FieldProps {
  label: string;
  placeholder: string;
  className?: string;
  startIcon?: React.ReactNode;
  registration?: ReturnType<typeof useForm<MunicipalityFormValues>>["register"];
  name?: keyof MunicipalityFormValues;
}

function Field({
  label,
  placeholder,
  className,
  startIcon,
  registration,
  name,
}: FieldProps) {
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
          placeholder={placeholder}
          className={cn(fieldClass, startIcon && "pl-11")}
          {...(registration && name ? registration(name) : {})}
        />
      </div>
    </div>
  );
}

export function MunicipalityAddForm({
  className,
  onClose,
  onDismiss,
  onConfirm,
}: MunicipalityAddProps) {
  const createMunicipalityMutation = useCreateMunicipality();

  const { register, handleSubmit } = useForm<MunicipalityFormValues>({
    defaultValues: {
      code: "",
      nameNe: "",
      nameEn: "",
      headExecutiveNameEn: "",
      headExecutiveNameNe: "",
      email: "",
      phoneNo: "",
    },
  });

  const handleClose = () => {
    onClose?.();
  };

  const handleDismiss = () => {
    onDismiss?.();
    onClose?.();
  };

  const onSubmit = async (values: MunicipalityFormValues) => {
    try {
      await createMunicipalityMutation.mutateAsync(values);
      onConfirm?.();
      onClose?.();
    } catch (error) {
      console.error("Create municipality failed:", error);
    }
  };

  return (
    <section
      className={cn(
        "min-h-screen h-dvh overflow-hidden bg-[#040B18] p-5 md:p-8",
        className,
      )}
    >
      <form
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#242C3E] bg-[#1A1F2B] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            className="md:col-span-2"
            label="Code"
            placeholder="MUN-001"
            registration={register}
            name="code"
          />
          <Field
            label="Municipality Name (EN)"
            placeholder="Kathmandu Metropolitan City"
            registration={register}
            name="nameEn"
          />
          <Field
            label="नगरपालिकाको नाम (NE)"
            placeholder="काठमाडौँ महानगरपालिका"
            registration={register}
            name="nameNe"
          />
          <Field
            label="Mayor / Chief (EN)"
            placeholder="Executive Head Name"
            registration={register}
            name="headExecutiveNameEn"
          />
          <Field
            label="प्रमुखको नाम (NE)"
            placeholder="पूरा नाम नेपालीमा"
            registration={register}
            name="headExecutiveNameNe"
          />
          <Field
            label="Email Address"
            placeholder="info@municipality.gov.np"
            registration={register}
            name="email"
          />
          <Field
            label="Phone Number"
            placeholder="+977-XX-XXXXXXX"
            registration={register}
            name="phoneNo"
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
            type="submit"
            disabled={createMunicipalityMutation.isPending}
            className={cn(
              actionButtonVariants({ variant: "primary" }),
              "min-w-60 disabled:cursor-not-allowed disabled:opacity-70",
            )}
          >
            <Save className="h-4 w-4" />
            {createMunicipalityMutation.isPending
              ? "Saving..."
              : "Confirm Registry"}
          </button>
        </footer>
      </form>
    </section>
  );
}

export default MunicipalityAddForm;
