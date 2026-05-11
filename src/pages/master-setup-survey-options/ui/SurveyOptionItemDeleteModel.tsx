import { Trash2, X } from "lucide-react";
import { useState } from "react";

import { useDeleteOptionItem } from "../api";
import type { OptionItem } from "../model";

interface SurveyOptionItemDeleteModalProps {
	isOpen: boolean;
	optionItem?: OptionItem;
	optionListName?: string;
	onClose: () => void;
	onSave: (deletedId: string) => void | Promise<void>;
}

export function SurveyOptionItemDeleteModal({
	isOpen,
	optionItem,
	optionListName,
	onClose,
	onSave,
}: SurveyOptionItemDeleteModalProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const { mutateAsync: deleteOptionItemAsync } = useDeleteOptionItem();

	if (!isOpen) {
		return null;
	}

	const normalizedItemId = optionItem?.id?.trim() ?? "";
	const canDelete = normalizedItemId.length > 0;

	const handleClose = () => {
		if (isDeleting) {
			return;
		}

		onClose();
	};

	const handleDelete = () => {
		if (!canDelete) {
			return;
		}

		setIsDeleting(true);

		deleteOptionItemAsync({ id: normalizedItemId })
			.then(() => {
				onSave(normalizedItemId);
				onClose();
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return (
		<div className="fixed inset-0 z-50 bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
			<div className="mx-auto mt-8 w-full max-w-xl rounded-[22px] border border-[#242C3F] bg-[#171D2A] p-6 shadow-[0_24px_70px_rgba(2,8,22,0.5)]">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7E879A]">
							Survey Directory
						</p>
						<h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#E8ECF8]">
							Delete {optionListName ?? "Survey Option Item"}
						</h3>
						<p className="mt-2 text-sm text-[#8D97AC]">
							This action will permanently remove this option item.
						</p>
					</div>

					<button
						type="button"
						onClick={handleClose}
						disabled={isDeleting}
						className="rounded-xl p-2 text-[#96A0B4] transition-colors hover:bg-[#21293A] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<div className="mt-6 rounded-2xl border border-[#513244] bg-[#2A1B2A] px-4 py-4">
					<p className="text-sm text-[#F1A2B4]">
						<span className="font-semibold">Item:</span>{" "}
						{optionItem?.labelEn ?? "No item selected"}
					</p>
					<p className="mt-1 text-xs text-[#C690A0]">
						{optionItem?.labelNe ?? "Select an option item before deleting."}
					</p>
				</div>

				{!canDelete && (
					<p className="mt-4 rounded-2xl border border-[#513244] bg-[#2A1B2A] px-4 py-3 text-sm font-medium text-[#F1A2B4]">
						Select an option item before deleting.
					</p>
				)}

				<div className="mt-7 flex flex-wrap justify-end gap-3">
					<button
						type="button"
						onClick={handleClose}
						disabled={isDeleting}
						className="rounded-2xl border border-[#2A3348] px-4 py-3 text-sm font-semibold text-[#AEB7CA] transition-colors hover:bg-[#20283A] disabled:cursor-not-allowed disabled:opacity-60"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleDelete}
						disabled={!canDelete || isDeleting}
						className="inline-flex items-center gap-2 rounded-2xl bg-[#D44D62] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E55E73] disabled:cursor-not-allowed disabled:opacity-60"
					>
						<Trash2 className="h-4 w-4" />
						{isDeleting ? "Deleting..." : "Delete Option Item"}
					</button>
				</div>
			</div>
		</div>
	);
}
