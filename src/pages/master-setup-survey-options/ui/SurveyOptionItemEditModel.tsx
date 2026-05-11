import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ApiError } from "@shared/api";
import { Button } from "@shared/ui/Button";
import { FormField, Input } from "@shared/ui/Input";
import { Modal } from "@shared/ui/Modal";

import { useUpdateOptionItem } from "../api";
import type { OptionItem } from "../model";

// Form-specific schema for editing option items
const updateOptionItemFormSchema = z.object({
  labelEn: z.string().min(1, "English label is required").optional(),
  labelNe: z.string().min(1, "Nepali label is required").optional(),
});

type UpdateOptionItemFormData = z.infer<typeof updateOptionItemFormSchema>;

interface SurveyOptionItemEditModalProps {
	isOpen: boolean;
	optionItem?: OptionItem;
	optionListName?: string;
	onClose: () => void;
	onSave: (item: OptionItem) => void | Promise<void>;
}

export function SurveyOptionItemEditModal({
	isOpen,
	optionItem,
	optionListName,
	onClose,
	onSave,
}: SurveyOptionItemEditModalProps) {
	const [apiError, setApiError] = useState<string | null>(null);
	const { mutateAsync: updateOptionItemAsync } = useUpdateOptionItem();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<UpdateOptionItemFormData>({
		resolver: zodResolver(updateOptionItemFormSchema),
		defaultValues: {
			labelEn: optionItem?.labelEn ?? "",
			labelNe: optionItem?.labelNe ?? "",
		},
		values: {
			labelEn: optionItem?.labelEn ?? "",
			labelNe: optionItem?.labelNe ?? "",
		},
	});

	if (!isOpen) {
		return null;
	}

	const normalizedItemId = optionItem?.id?.trim() ?? "";

	const handleClose = () => {
		if (isSubmitting) {
			return;
		}

		setApiError(null);
		onClose();
	};

	const handleSave = async (data: UpdateOptionItemFormData) => {
		if (normalizedItemId.length === 0) {
			return;
		}

		const payload = {
			labelEn: (data.labelEn ?? "").trim(),
			labelNe: (data.labelNe ?? "").trim(),
		};

		setApiError(null);

		try {
			const updatedItem = await updateOptionItemAsync({
				id: normalizedItemId,
				data: payload,
			});

			await onSave(updatedItem);
			onClose();
		} catch (error) {
			const apiErrorObj = error as ApiError;
			setApiError(apiErrorObj.message || "Failed to update option item.");
			console.error("Error updating option item:", error);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			title={`Edit ${optionListName ?? "Survey Option Item"}`}
			description="Update selected option item details."
			onClose={handleClose}
			disableClose={isSubmitting}
		>
			<form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-6">
				<FormField label="Name (EN)" required>
					<Input
						{...register("labelEn")}
						placeholder="Enter English item name"
					/>
				</FormField>

				<FormField label="Name (NE)" required>
					<Input
						{...register("labelNe")}
						placeholder="Nepali item name"
					/>
				</FormField>

				{!normalizedItemId ? (
					<p className="rounded-(--mis-field-radius) border border-(--mis-color-error-100) bg-(--mis-color-error-50) px-4 py-3 text-sm font-semibold text-(--mis-color-error-600)">
						Select an option item before editing.
					</p>
				) : null}

				{apiError ? (
					<p className="rounded-(--mis-field-radius) border border-(--mis-color-error-100) bg-(--mis-color-error-50) px-4 py-3 text-sm font-semibold text-(--mis-color-error-600)">
						{apiError}
					</p>
				) : null}

				<div className="flex flex-wrap justify-end gap-3 border-t border-(--mis-color-ink-200) pt-5">
					<Button
						type="button"
						variant="ghost"
						onClick={handleClose}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={normalizedItemId.length === 0 || isSubmitting}
					>
						<Pencil className="h-4 w-4" />
						{isSubmitting ? "Updating..." : "Update Option Item"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
