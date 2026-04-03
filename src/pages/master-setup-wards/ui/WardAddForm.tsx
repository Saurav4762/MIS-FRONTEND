import type { ReactNode } from "react";

import { cva } from "class-variance-authority";
import { Save, ShieldPlus, X } from "lucide-react";

import cn from "@shared/lib";

const actionButtonVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-widest transition-colors",
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

interface WardAddFormProps {
	className?: string;
	onClose?: () => void;
	onDismiss?: () => void;
	onConfirm?: () => void;
}

interface FieldProps {
	label: string;
	placeholder: string;
	className?: string;
	startIcon?: ReactNode;
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
					className={cn(fieldClass, startIcon && "pl-11", className)}
				/>
			</div>
		</div>
	);
}

export function WardAddForm({
	className,
	onClose,
	onDismiss,
	onConfirm,
}: WardAddFormProps) {
	const handleClose = () => {
		onClose?.();
	};

	const handleDismiss = () => {
		onDismiss?.();
		onClose?.();
	};

	return (
		<section className={cn("min-h-screen h-dvh overflow-hidden p-5 md:p-8", className)}>
			<div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#242C3E] bg-[#1A1F2B] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
				<header className="flex items-start justify-between border-b border-[#232B3E] px-8 py-8 md:px-10">
					<div className="flex items-center gap-4">
						<div className="grid h-12 w-12 place-items-center rounded-xl border border-[#2F4AFF] bg-[#1F2B4A] text-[#4D67FF]">
							<ShieldPlus className="h-5 w-5" />
						</div>
						<div>
							<h1 className="text-3xl font-semibold leading-none tracking-[-0.02em] text-[#E8EBF3]">
								Add New Ward Entity
							</h1>
							<p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#A1A8BA]">
								New Registry Entry
							</p>
						</div>
					</div>

					<button
						type="button"
						aria-label="Close"
						onClick={handleClose}
						className="rounded-lg p-2 text-[#C5CBD8] transition-colors hover:bg-[#2B3245] hover:text-white"
					>
						<X className="h-6 w-6" />
					</button>
				</header>

				<div className="space-y-8 px-8 py-8 md:px-10 md:py-10">
					<div className="grid grid-cols-2 gap-x-6 gap-y-7">
						<Field label="Ward Name (EN)" placeholder="e.g. Ward 01" />
						<Field label="वडाको नाम (NE)" placeholder="वडा नं. १" />
						<Field label="Representative (EN)" placeholder="Full Name" />
						<Field label="प्रतिनिधि (NE)" placeholder="पुरा नाम" />
					</div>

					<div className="grid grid-cols-3 gap-x-6 gap-y-7">
						<Field label="Official Email" placeholder="ward@bhadrapur.gov.np" />
						<Field label="Phone Number" placeholder="+977-..." />
						<Field label="Official Website" placeholder="https://wardXX.bhadrapur.gov.np" />
					</div>
				</div>

				<footer className="flex flex-wrap items-center justify-end gap-4 border-t border-[#232B3E] px-8 py-8 md:px-10">
					<button
						type="button"
						onClick={handleDismiss}
						className={cn(actionButtonVariants({ variant: "ghost" }))}
					>
						Discard
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className={cn(
							actionButtonVariants({ variant: "primary" }),
							"min-w-74",
						)}
					>
						<Save className="h-4 w-4" />
						Register Ward Entity
					</button>
				</footer>
			</div>
		</section>
	);
}

export default WardAddForm;
