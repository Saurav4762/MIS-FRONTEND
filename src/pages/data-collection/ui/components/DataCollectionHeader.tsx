import { Input } from "@shared/ui/Input";
import { ArrowRight, Search } from "lucide-react";
import { ButtonLink } from "@shared/ui/ButtonLink";

export default function DataCollectionHeader() {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 max-w-2xl">
          <div className="relative border-field border-solid rounded-field border-ink-200 bg-white p-0.5 h-min">
            <span className="absolute inset-y-0 left-3 flex items-center text-ink-400">
              <Search className="h-5 w-5" />
            </span>
            <Input placeholder="Search records..." className="pl-8 py-2" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <ButtonLink
            variant="ghost"
            size="sm"
            to="/data-collection/forms/drafts"
          >
            <span>See drafts</span>
            <span>
              <ArrowRight className="h-3 w-3 stroke-3" />{" "}
            </span>
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
