import { useDeleteMunicipality } from "../api";
import type { Municipality } from "../model";
import { X } from "lucide-react";

interface MunicipalityDeleteConfirmBoxProps {
  municipality: Pick<Municipality, "id" | "nameEn" | "nameNe"> | null;
  onClose: () => void;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function MunicipalityDeleteConfirmBox({
  municipality,
  onClose,
  onConfirm,
  onDismiss,
}: MunicipalityDeleteConfirmBoxProps) {
  const deleteMunicipalityMutation = useDeleteMunicipality();

  if (!municipality?.id) {
    onClose();
    return;
  }

  const handleClose = () => {
    onClose?.();
  };
  const handleDismiss = () => {
    onDismiss?.();
    onClose?.();
  };

  const handleDelete = async () => {
    try {
      await deleteMunicipalityMutation.mutateAsync(municipality);
      onConfirm?.();
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <section className="m-auto h-dvh flex items-center pb-30">
      <div className="space-y-6 w-fit m-auto bg-[#040B18] px-12 py-8 rounded-3xl">
        <header>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-medium">Are you sure ?</div>
            <button
              onClick={() => handleClose()}
              className="p-2 cursor-pointer"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
        </header>
        <div className="text-lg space-x-2">
          <span>You want to delete</span>
          <span className="text-lg font-medium text-red-300">
            {municipality.nameNe} ({municipality.nameEn})
          </span>
        </div>
        <footer className="flex justify-between">
          <button
            className="bg-red-700 px-6 py-3 rounded-md cursor-pointer"
            onClick={() => handleDismiss()}
          >
            Dismiss
          </button>
          <button
            className="px-6 py-3 rounded-md cursor-pointer "
            onClick={() => handleDelete()}
          >
            Confirm
          </button>
        </footer>
      </div>
    </section>
  );
}
