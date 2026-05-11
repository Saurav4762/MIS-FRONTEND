import { useState } from "react";

import { cva } from "class-variance-authority";
import { Save, ShieldCheck, X } from "lucide-react";

import cn from "@shared/lib";
import { useUpdateWard } from "../api";
import type { UpdateWardPayload } from "../model";

const actionButtonVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-widest transition-colors",
	{
		variants: {
			variant: {
				ghost: "text-[var(--mis-color-ink-700)] hover:text-[var(--mis-color-ink-900)]",
				primary:
					"bg-[var(--mis-color-pri-500)] text-white shadow-[var(--mis-shadow-focus)] hover:bg-[var(--mis-color-pri-600)]",
			},
		},
		defaultVariants: {
			variant: "ghost",
		},
	},
);

const fieldClass =
	"h-14 w-full rounded-xl border border-[var(--mis-color-ink-300)] bg-[var(--mis-color-white)] px-4 text-sm text-[var(--mis-color-ink-800)] placeholder:text-[var(--mis-color-ink-500)] outline-none transition-colors focus:border-[var(--mis-color-pri-600)]";

interface WardEditFormProps {
	className?: string;
	wardId: string;
	municipalityId: string;
	initialNumber?: number;
	initialRepresentativeNameEn?: string;
	initialRepresentativeNameNe?: string;
	initialPhone?: string;
	initialEmail?: string;
	onClose?: () => void;
	onDismiss?: () => void;
	onConfirm?: () => void;
}

export function WardEditForm({
	className,
	wardId,
	municipalityId,
	initialNumber = 0,
	initialRepresentativeNameEn = "",
	initialRepresentativeNameNe = "",
	initialPhone = "",
	initialEmail = "",
	onClose,
	onDismiss,
	onConfirm,
}: WardEditFormProps) {
	const [number, setNumber] = useState(String(initialNumber));
	const [representativeNameEn, setRepresentativeNameEn] = useState(
		initialRepresentativeNameEn,
	);
	const [representativeNameNe, setRepresentativeNameNe] = useState(
		initialRepresentativeNameNe,
	);
	const [phone, setPhone] = useState(initialPhone);
	const [email, setEmail] = useState(initialEmail);
	const [formError, setFormError] = useState("");
	const { mutateAsync: updateWard, isPending } = useUpdateWard();

	const isFormValid =
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

		if (!isFormValid) {
			setFormError(
				"Ward number and representative names in both EN and NE are required.",
			);
			return;
		}

		const payload: UpdateWardPayload = {
			number: Number(number),
			representativeNameEn: representativeNameEn.trim(),
			representativeNameNe: representativeNameNe.trim(),
			phoneNo: phone.trim() || undefined,
			email: email.trim() || undefined,
		};

		try {
			await updateWard({ id: wardId, municipalityId, data: payload });
			onConfirm?.();
			onClose?.();
		} catch (error) {
			console.error("Failed to update ward:", error);
			setFormError("Failed to update ward. Please try again.");
		}
	};

	return (
		<section className={cn("min-h-screen h-dvh overflow-hidden p-5 md:p-8", className)}>
			<div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--mis-color-ink-200)] bg-[var(--mis-color-white)] shadow-[var(--mis-shadow-lg)]">
				<header className="flex items-start justify-between border-b border-[var(--mis-color-ink-200)] px-8 py-8 md:px-10">
					<div className="flex items-center gap-4">
						<div className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--mis-color-pri-500)] bg-[var(--mis-color-pri-50)] text-[var(--mis-color-pri-600)]">
							<ShieldCheck className="h-5 w-5" />
						</div>
						<div>
							<h1 className="text-3xl font-semibold leading-none tracking-[-0.02em] text-[var(--mis-color-ink-900)]">
								Edit Ward Entity
							</h1>
							<p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mis-color-ink-500)]">
								Registry Update
							</p>
						</div>
					</div>

					<button
						type="button"
						aria-label="Close"
						onClick={handleClose}
						className="rounded-lg p-2 text-[var(--mis-color-ink-600)] transition-colors hover:bg-[var(--mis-color-ink-100)] hover:text-[var(--mis-color-ink-900)]"
					>
						<X className="h-6 w-6" />
					</button>
				</header>

<form className="space-y-8 px-8 py-8 md:px-10 md:py-10">
				<div className="grid grid-cols-2 gap-x-6 gap-y-7">
					<div className="space-y-3">
						<label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--mis-color-ink-500)]">
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
						<label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--mis-color-ink-500)]">
							Representative Name (EN)
						</label>
						<input
							type="text"
							value={representativeNameEn}
							onChange={(event) => setRepresentativeNameEn(event.target.value)}
							placeholder="Full Name"
							className={fieldClass}
						/>
					</div>
					<div className="space-y-3">
						<label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--mis-color-ink-500)]">
							Representative Name (NE)
						</label>
						<input
							type="text"
							value={representativeNameNe}
							onChange={(event) => setRepresentativeNameNe(event.target.value)}
							placeholder="पूरा नाम"
							className={fieldClass}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-6 gap-y-7">
					<div className="space-y-3">
						<label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--mis-color-ink-500)]">
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
						<label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--mis-color-ink-500)]">
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
					<p className="rounded-lg border border-[var(--mis-color-error-100)] bg-[var(--mis-color-error-50)] px-4 py-3 text-sm font-medium text-[var(--mis-color-error-600)]">
						{formError}
					</p>
				)}
			</form>

				<footer className="flex flex-wrap items-center justify-end gap-4 border-t border-[var(--mis-color-ink-200)] px-8 py-8 md:px-10">
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
						{isPending ? "Saving..." : "Save Ward Entity"}
					</button>
				</footer>
			</div>
		</section>
	);
}

export default WardEditForm;

