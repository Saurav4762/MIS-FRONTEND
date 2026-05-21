import { HeartPulse } from "lucide-react";

export default function HealthFormHeader() {
  return (
    <header className="flex items-center gap-5 p-3.5 border-b border-ink-200">
      <div className="p-6 bg-ink-100 rounded-lg">
        <HeartPulse className="text-pri-500" size={24} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-ink-800">
          Health Information
        </h2>
        <p className="text-sm text-ink-600">
          Provide details about the household's health status and access to
          healthcare.
        </p>
      </div>
    </header>
  );
}
