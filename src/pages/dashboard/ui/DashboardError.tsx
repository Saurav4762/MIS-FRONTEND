import { AlertCircle } from "lucide-react";

interface DashboardErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function DashboardError({
  message = "Failed to load dashboard data",
  onRetry,
}: DashboardErrorProps) {
  return (
    <div className="rounded-lg border border-red-900 bg-red-950 p-6">
      <div className="flex items-start gap-4">
        <AlertCircle className="h-6 w-6 flex-shrink-0 text-red-400" />
        <div className="flex-1">
          <p className="font-semibold text-red-200">{message}</p>
          <p className="mt-1 text-sm text-red-300">
            Please try again or contact support if the problem persists.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 rounded bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

