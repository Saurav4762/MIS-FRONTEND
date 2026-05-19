import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@shared/ui/Button";

type ResidenceFormFooterProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export default function ResidenceFormFooter({
  onPrevious,
  onNext,
}: ResidenceFormFooterProps) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 px-5 py-4">
      <Button
        variant="secondary"
        size="sm"
        className="w-full justify-center gap-2 sm:w-auto"
        onClick={onPrevious}
      >
        <MoveLeft className="h-4 w-4" />
        <span>Previous</span>
        <span className="text-xs font-semibold text-ink-400">(अघिल्लो)</span>
      </Button>

      <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
        <Button
          variant="secondary"
          size="sm"
          className="w-full justify-center sm:w-auto"
        >
          <span>Save Draft</span>
          <span className="text-xs font-semibold text-ink-400">
            (मस्यौदा सुरक्षित गर्नुहोस्)
          </span>
        </Button>

        <Button
          variant="primary"
          size="sm"
          className="w-full justify-center gap-2 bg-success-500 shadow-success hover:bg-success-600 sm:w-auto"
          onClick={onNext}
        >
          <span>Next Step</span>
          <span className="text-xs font-semibold text-white/80">
            (अर्को चरण)
          </span>
          <MoveRight className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
}
