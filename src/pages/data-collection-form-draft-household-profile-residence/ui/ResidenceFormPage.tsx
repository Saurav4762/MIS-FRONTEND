import { Home } from "lucide-react";
import { FormField, Input, Select, Textarea } from "@shared/ui/Input";
import {
  FLOOR_MATERIAL_OPTIONS,
  OWNERSHIP_STATUS_OPTIONS,
  RESIDENCE_TYPE_OPTIONS,
  ROOF_MATERIAL_OPTIONS,
  TOILET_FACILITY_OPTIONS,
  WATER_SOURCE_OPTIONS,
  YES_NO_OPTIONS,
  DISTRICT_OPTIONS,
  REASON_FOR_MIGRATION_OPTIONS,
} from "../model/residence-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ResidenceFormSchema, type ResidenceFormValues } from "../model/types";
import ResidenceFormFooter from "./ResidenceFormFooter";
import { useNavigate, useParams } from "@tanstack/react-router";

export default function ResidenceFormPage() {
  const navigate = useNavigate();
  const { caseId, householdId } = useParams({
    from: "/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId/residence",
  });
  const {
    control,
    handleSubmit,
    // register,
    setValue,
    // formState: { errors },
  } = useForm<ResidenceFormValues>({
    resolver: zodResolver(ResidenceFormSchema),
    defaultValues: {
      ownershipStatus: "",
      housingType: "",
      roofMaterial: "",
      floorMaterial: "",
      waterSource: "",
      toiletFacility: "",
      electricityAccess: "no",
      internetAccess: "no",
      roomCount: 0,
      remarks: "",
      hasMigrated: false,
      previousDistrict: "",
      previousMunicipality: "",
      reasonForMigration: "",
    },
  });

  const hasMigrated = useWatch({
    control,
    name: "hasMigrated",
  });

  function onSubmit(values: ResidenceFormValues) {
    // TODO: replace with API / save logic
    console.log("Residence form submit:", values);
  }

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
      <header className="flex shrink-0 items-center justify-between border-b border-ink-200 px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-pri-50 text-pri-600">
            <Home className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-6 text-ink-900">
              Residence Details
            </h1>
            <p className="mt-0.5 text-sm font-bold uppercase tracking-wide text-ink-400">
              बसोबास विवरण
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-ink-500">
          {/* {saveState === "saving" ? "Saving..." : null}
          {saveState === "saved" ? "Saved" : null}
          {saveState === "error" ? "Save failed" : null}
          {saveState === "idle" ? "" : null} */}
        </span>
      </header>

      <form
        className="custom-scrollbar flex-1 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-auto space-y-12 px-17 py-13 md:px-16 md:py-12">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            <FormField
              as="div"
              label="Ownership Status"
              labelSuffix="(स्वामित्व स्थिति)"
            >
              <Controller
                control={control}
                name="ownershipStatus"
                render={({ field }) => (
                  <Select
                    placeholder="Select ownership"
                    options={OWNERSHIP_STATUS_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Housing Type"
              labelSuffix="(आवासको प्रकार)"
            >
              <Controller
                control={control}
                name="housingType"
                render={({ field }) => (
                  <Select
                    placeholder="Select housing type"
                    options={RESIDENCE_TYPE_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Roof Material"
              labelSuffix="(छानाको प्रकार)"
            >
              <Controller
                control={control}
                name="roofMaterial"
                render={({ field }) => (
                  <Select
                    placeholder="Select roof material"
                    options={ROOF_MATERIAL_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Floor Material"
              labelSuffix="(भुइँको प्रकार)"
            >
              <Controller
                control={control}
                name="floorMaterial"
                render={({ field }) => (
                  <Select
                    placeholder="Select floor material"
                    options={FLOOR_MATERIAL_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Water Source"
              labelSuffix="(पानीको स्रोत)"
            >
              <Controller
                control={control}
                name="waterSource"
                render={({ field }) => (
                  <Select
                    placeholder="Select water source"
                    options={WATER_SOURCE_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Toilet Facility"
              labelSuffix="(शौचालय सुविधा)"
            >
              <Controller
                control={control}
                name="toiletFacility"
                render={({ field }) => (
                  <Select
                    placeholder="Select toilet facility"
                    options={TOILET_FACILITY_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Electricity Access"
              labelSuffix="(बिजुली पहुँच)"
            >
              <Controller
                control={control}
                name="electricityAccess"
                render={({ field }) => (
                  <Select
                    placeholder="Select option"
                    options={YES_NO_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Internet Access"
              labelSuffix="(इन्टरनेट पहुँच)"
            >
              <Controller
                control={control}
                name="internetAccess"
                render={({ field }) => (
                  <Select
                    placeholder="Select option"
                    options={YES_NO_OPTIONS}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </FormField>

            <FormField as="div" label="Room Count" labelSuffix="(कोठा संख्या)">
              <Controller
                control={control}
                name="roomCount"
                render={({ field }) => (
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter number of rooms"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </FormField>

            <FormField
              as="div"
              label="Remarks"
              labelSuffix="(टिप्पणी)"
              className="md:col-span-2"
            >
              <Controller
                control={control}
                name="remarks"
                render={({ field }) => (
                  <Textarea
                    placeholder="Write any additional notes"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </FormField>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-17 md:px-16">
          <div className="pt-4 border-t border-ink-200">
            <div className="mb-4">
              <label className="block text-sm font-bold text-ink-700 mb-2">
                Has family migrated in the last 5 years?{" "}
                <span className="text-sm text-ink-400">
                  (पछिल्लो ५ वर्षमा बसाईँसराइ भएको?)
                </span>
              </label>
              <div className="inline-flex items-center bg-ink-50 rounded-full p-1 border border-ink-200 w-fit h-12">
                <button
                  type="button"
                  id="toggle-no"
                  onClick={() => setValue("hasMigrated", false)}
                  className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-200 h-full flex items-center justify-center ${!hasMigrated ? "bg-pri-600 text-white shadow-sm" : "text-ink-400"}`}
                >
                  NO
                </button>
                <button
                  type="button"
                  id="toggle-yes"
                  onClick={() => setValue("hasMigrated", true)}
                  className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-200 h-full flex items-center justify-center ${hasMigrated ? "bg-pri-600 text-white shadow-sm" : "text-ink-400"}`}
                >
                  YES
                </button>
              </div>
            </div>

            {hasMigrated && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <FormField
                    as="div"
                    label="Previous District"
                    labelSuffix="(अघिल्लो जिल्ला)"
                  >
                    <Controller
                      control={control}
                      name="previousDistrict"
                      render={({ field }) => (
                        <Select
                          placeholder="Select District"
                          options={DISTRICT_OPTIONS}
                          value={field.value}
                          onChange={(v) => field.onChange(v)}
                        />
                      )}
                    />
                  </FormField>

                  <FormField
                    as="div"
                    label="Previous Municipality"
                    labelSuffix="(अघिल्लो नगरपालिका)"
                  >
                    <Controller
                      control={control}
                      name="previousMunicipality"
                      render={({ field }) => (
                        <Select
                          placeholder="Select Municipality"
                          options={[]}
                          value={field.value}
                          onChange={(v) => field.onChange(v)}
                        />
                      )}
                    />
                  </FormField>
                </div>

                <FormField
                  as="div"
                  label="Reason for Migration"
                  labelSuffix="(बसाईँसराइको कारण)"
                >
                  <Controller
                    control={control}
                    name="reasonForMigration"
                    render={({ field }) => (
                      <Select
                        placeholder="Select Reason"
                        options={REASON_FOR_MIGRATION_OPTIONS}
                        value={field.value}
                        onChange={(v) => field.onChange(v)}
                      />
                    )}
                  />
                </FormField>
              </div>
            )}
          </div>

          <ResidenceFormFooter
            onPrevious={() => {
              navigate({
                to: `/data-collection/forms/drafts/${caseId}/household-profile/${householdId}/economic`,
              });
            }}
            onNext={() => {
              navigate({
                to: `/data-collection/forms/drafts/${caseId}/household-profile/${householdId}/economic`,
              });
            }}
          />
        </div>
      </form>
    </section>
  );
}
