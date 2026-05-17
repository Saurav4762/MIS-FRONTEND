import { Building2, MoveLeft, MoveRight } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useId, useState } from "react";
import cn from "@shared/lib";
import { Button } from "@shared/ui/Button";
import { FormField, Select } from "@shared/ui/Input";

const RESIDENCE_TYPES = [
  "Owned house",
  "Rented house",
  "Shared house",
  "Temporary shelter",
];

const LAND_OWNERSHIP_TYPES = [
  "Private",
  "Government",
  "Guthi",
  "Public",
  "Other",
];

const PREVIOUS_DISTRICTS = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Kaski",
  "Chitwan",
];

const PREVIOUS_MUNICIPALITIES = [
  "Kathmandu Metropolitan City",
  "Lalitpur Metropolitan City",
  "Bhaktapur Municipality",
  "Pokhara Metropolitan City",
  "Bharatpur Metropolitan City",
];

const MIGRATION_REASONS = [
  "Employment",
  "Education",
  "Marriage",
  "Natural disaster",
  "Other",
];

type MigrationStatus = "no" | "yes";

export default function ResidenceFormPage() {
  const navigate = useNavigate();
  const { surveyId } = useParams({
    from: "/_app/data-collection/forms/drafts/$surveyId/household-profile/residence",
  });

  const [residenceType, setResidenceType] = useState("");
  const [landOwnership, setLandOwnership] = useState("");
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus>("no");
  const [previousDistrict, setPreviousDistrict] = useState("");
  const [previousMunicipality, setPreviousMunicipality] = useState("");
  const [migrationReason, setMigrationReason] = useState("");
  const residenceTypeId = useId();
  const landOwnershipId = useId();
  const previousDistrictId = useId();
  const previousMunicipalityId = useId();
  const migrationReasonId = useId();

  const goPrevious = () => {
    navigate({
      to: "/data-collection/forms/drafts/$surveyId/household-profile/social-cultural",
      params: { surveyId },
    });
  };

  const goNext = () => {
    navigate({
      to: "/data-collection/forms/drafts/$surveyId/household-profile/economic",
      params: { surveyId },
    });
  };

  return (
    <section className="flex h-full flex-col overflow-auto rounded-xl border border-ink-200 bg-white shadow-sm">
      <header className="flex items-center gap-4 border-b border-ink-200 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-pri-50 text-pri-600">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-6 text-ink-900">
            Residence Details
          </h1>
          <p className="mt-0.5 text-sm font-semibold text-ink-400">
            बसोबास विवरण
          </p>
        </div>
      </header>

      <div className="overflow-y-auto h-full flex flex-col">
        <form className="flex flex-1 flex-col px-17 py-13 ">
          <div className="grid max-w-180 grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
            <FormField
              as="div"
              htmlFor={residenceTypeId}
              label="Residence Type"
              labelSuffix="(बसोबासको प्रकार)"
              className="space-y-3"
            >
              <Select
                id={residenceTypeId}
                value={residenceType}
                placeholder="Select Type"
                options={RESIDENCE_TYPES}
                onChange={(event) => setResidenceType(event.target.value)}
              />
            </FormField>

            <FormField
              as="div"
              htmlFor={landOwnershipId}
              label="Land Ownership"
              labelSuffix="(जग्गा स्वामित्व)"
              className="space-y-3"
            >
              <Select
                id={landOwnershipId}
                value={landOwnership}
                placeholder="Select Ownership"
                options={LAND_OWNERSHIP_TYPES}
                onChange={(event) => setLandOwnership(event.target.value)}
              />
            </FormField>
          </div>

          <section className="mt-15 max-w-180">
            <div className="border-b border-ink-200 pb-4">
              <h2 className="text-base font-bold leading-5 text-ink-900">
                Migration History
              </h2>
              <p className="mt-1 text-[11px] font-semibold text-ink-400">
                बसाईसराइ विवरण
              </p>
            </div>

            <div className="mt-8">
              <FormField
                as="fieldset"
                label="Has family migrated in the last 5 years?"
                labelSuffix="(पछिल्लो ५ वर्षमा बसाईसराइ भएको?)"
                className="space-y-3"
              >
                <div className="inline-grid grid-cols-2 border border-ink-200 bg-ink-50 rounded-full p-1">
                  <Button
                    onClick={() => setMigrationStatus("no")}
                    isActive={migrationStatus === "no"}
                    variant={"ghost"}
                    size="sm"
                    aria-pressed={migrationStatus === "no"}
                    className={cn("rounded-full px-4 py-2")}
                  >
                    NO
                  </Button>
                  <Button
                    onClick={() => setMigrationStatus("yes")}
                    isActive={migrationStatus === "yes"}
                    variant={"ghost"}
                    size="sm"
                    aria-pressed={migrationStatus === "yes"}
                    className={cn("rounded-full px-8 py-2")}
                  >
                    YES
                  </Button>
                </div>
              </FormField>

              {migrationStatus === "yes" && (
                <div className="mt-8 grid max-w-180 grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
                  <FormField
                    as="div"
                    htmlFor={previousDistrictId}
                    label="Previous District"
                    labelSuffix="(अघिल्लो जिल्ला)"
                    className="space-y-3"
                  >
                    <Select
                      id={previousDistrictId}
                      value={previousDistrict}
                      placeholder="Select District"
                      options={PREVIOUS_DISTRICTS}
                      onChange={(event) =>
                        setPreviousDistrict(event.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    as="div"
                    htmlFor={previousMunicipalityId}
                    label="Previous Municipality"
                    labelSuffix="(अघिल्लो नगरपालिका)"
                    className="space-y-3"
                  >
                    <Select
                      id={previousMunicipalityId}
                      value={previousMunicipality}
                      placeholder="Select Municipality"
                      options={PREVIOUS_MUNICIPALITIES}
                      onChange={(event) =>
                        setPreviousMunicipality(event.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    as="div"
                    htmlFor={migrationReasonId}
                    label="Reason for Migration"
                    labelSuffix="(बसाईसराइको कारण)"
                    className="space-y-3 md:col-span-2"
                  >
                    <Select
                      id={migrationReasonId}
                      value={migrationReason}
                      placeholder="Select Reason"
                      options={MIGRATION_REASONS}
                      onChange={(event) =>
                        setMigrationReason(event.target.value)
                      }
                    />
                  </FormField>
                </div>
              )}
            </div>
          </section>
        </form>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 px-5 py-4">
          <Button
            variant="secondary"
            size="sm"
            className="justify-center gap-3"
            onClick={goPrevious}
          >
            <MoveLeft className="h-4 w-4" />
            <span>Previous</span>
            <span className="text-xs font-semibold text-ink-400">
              (अघिल्लो)
            </span>
          </Button>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button variant="secondary" size="sm" className="justify-center">
              <span>Save Draft</span>
              <span className="text-xs font-semibold text-ink-400">
                (मस्यौदा बचत गर्नुहोस्)
              </span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center gap-2 bg-success-500 shadow-success hover:bg-success-600 sm:w-auto"
              onClick={goNext}
            >
              <span>Next Step</span>
              <span className="text-xs font-semibold text-white/80">
                (अर्को चरण)
              </span>
              <MoveRight className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </div>
    </section>
  );
}
