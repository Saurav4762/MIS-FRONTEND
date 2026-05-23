import ToggleField from "@shared/ui/Input/ToggleField";
import HealthFormFooter from "./HealthFormFooter";
import { Controller, useForm } from "react-hook-form";
import { FormField, Select } from "@shared/ui/Input";
import { useState } from "react";
import type { Health } from "../model";
import { ListCheck } from "lucide-react";
import IllnessTypes from "./IllnessTypes";
import cn from "@shared/lib";

export default function HealthFormBody() {
  const [insuraneOn, setInsuranceOn] = useState(false);
  const [illnessOn, setIllnessOn] = useState(false);
  const { control, handleSubmit } = useForm<Health>({
    defaultValues: {
      awarness: {
        handwashing: true,
        nutrition: true,
        care: true,
        checkups: true,
        supplements: true,
        vaccination: true,
      },
      insuranceProvider: "Other",
      illnesses: [],
    },
  });
  const onSubmit = (data: Health) => {
    console.log(data);
  };

  return (
    <form
      className="flex-1 p-6 space-y-6 overflow-y-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mx-auto space-y-14 px-17 py-13 md:px-16 md:py-12">
        <section className="space-y-6 w-full">
          <h3 className="text-xs font-medium text-ink-500 uppercase tracking-wide border-b border-ink-200 pb-2">
            Section 01: Awareness (तथ्यगत सचेतना)
          </h3>
          <div className="grid grid-cols-2 gap-y-12">
            <Controller
              control={control}
              name="awarness.handwashing"
              render={({ field }) => (
                <ToggleField
                  label={"Family practices handwashing with soap?"}
                  labelSuffix={"परिवारले साबुन पानीले हात धुने अभ्यास गर्छ?"}
                  value={field.value ? "yes" : "no"}
                  onChange={(value) =>
                    field.onChange(value === "yes" ? true : false)
                  }
                  options={[
                    { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
                    { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                  ]}
                  name={""}
                />
              )}
            />
            <Controller
              control={control}
              name="awarness.nutrition"
              render={({ field }) => (
                <ToggleField
                  label={"Family aware of balanced nutrition?"}
                  labelSuffix={"(परिवार सन्तुलित पोषणको बारेमा सचेत छ?)"}
                  value={field.value ? "yes" : "no"}
                  onChange={(value) =>
                    field.onChange(value === "yes" ? true : false)
                  }
                  options={[
                    { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
                    { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                  ]}
                  name={""}
                />
              )}
            />
            <Controller
              control={control}
              name="awarness.care"
              render={({ field }) => (
                <ToggleField
                  label={"Family aware of antenatal/postnatal care?"}
                  labelSuffix={"(परिवार प्रसूतिपूर्व/पश्चात हेरचाहमा सचेत छ?)"}
                  value={field.value ? "yes" : "no"}
                  onChange={(value) =>
                    field.onChange(value === "yes" ? true : false)
                  }
                  options={[
                    { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
                    { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                  ]}
                  name={""}
                />
              )}
            />
            <Controller
              control={control}
              name="awarness.checkups"
              render={({ field }) => (
                <ToggleField
                  label={"Children under 5 receiving health checkups?"}
                  labelSuffix={
                    "५ वर्ष मुनिका बालबालिकाको नियमित स्वास्थ्य जाँच?"
                  }
                  value={field.value ? "yes" : "no"}
                  onChange={(value) =>
                    field.onChange(value === "yes" ? true : false)
                  }
                  options={[
                    { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
                    { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                  ]}
                  name={""}
                />
              )}
            />
            <Controller
              control={control}
              name="awarness.supplements"
              render={({ field }) => (
                <ToggleField
                  label={"Iron/folic acid supplements received?"}
                  labelSuffix={"गर्भवती महिलाले आइरन/फोलिक एसिड चक्की प्रयोग?"}
                  value={field.value ? "yes" : "no"}
                  onChange={(value) =>
                    field.onChange(value === "yes" ? true : false)
                  }
                  options={[
                    { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
                    { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                  ]}
                  name={""}
                />
              )}
            />
            <Controller
              control={control}
              name="awarness.vaccination"
              render={({ field }) => (
                <ToggleField
                  label={"Children fully vaccinated?"}
                  labelSuffix={"परिवारले साबुन पानीले हात धुने अभ्यास गर्छ?"}
                  value={field.value ? "yes" : "no"}
                  onChange={(value) =>
                    field.onChange(value === "yes" ? true : false)
                  }
                  options={[
                    { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
                    { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                  ]}
                  name={""}
                />
              )}
            />
          </div>
        </section>

        <section className="space-y-6 w-full">
          <h3 className="text-xs font-medium text-ink-500 uppercase tracking-wide border-b border-ink-200 pb-2">
            Section 03: Awareness (तथ्यगत सचेतना)
          </h3>
          <div className="grid grid-cols-2">
            <ToggleField
              label={"Family practices handwashing with soap?"}
              labelSuffix={"परिवारले साबुन पानीले हात धुने अभ्यास गर्छ?"}
              value={insuraneOn ? "yes" : "no"}
              onChange={(value) => setInsuranceOn(value === "yes")}
              options={[
                { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
              ]}
              name={""}
            />
            <Select
              options={[
                { labelEn: "Select an option", value: "" },
                { labelEn: "Government Health Insurance", value: "government" },
                {
                  labelEn: "Private Insurance",
                  value: "private",
                },
                { labelEn: "Community Fund", value: "community" },
                { labelEn: "Other", value: "other" },
              ]}
            />
          </div>
        </section>

        <section className="space-y-6 w-full">
          <h3 className="text-xs font-medium text-ink-500 uppercase tracking-wide border-b border-ink-200 pb-2">
            Section 02: Health Insurance ((स्वास्थ्य बीमा)
          </h3>
          <div className="flex flex-col gap-6">
            <ToggleField
              label={"Family practices handwashing with soap?"}
              labelSuffix={"परिवारले साबुन पानीले हात धुने अभ्यास गर्छ?"}
              value={illnessOn ? "yes" : "no"}
              onChange={(value) => setIllnessOn(value === "yes")}
              options={[
                { id: "2", labelEn: "No", labelNe: "होइन", value: "no" },
                { id: "1", labelEn: "Yes", labelNe: "हो", value: "yes" },
              ]}
              name={""}
            />
            {illnessOn && (
              <Controller
                control={control}
                name="illnesses"
                render={({ field }) => (
                  <div
                    className={cn(
                      "rounded-xl shadow-sm p-6 border border-ink-50",
                      field.value && field.value.length > 0
                        ? "bg-ink-50/50"
                        : "bg-error-50 border border-error-50",
                    )}
                  >
                    <FormField
                      htmlFor="#"
                      label="Illness Types (रोगका प्रकार)"
                      required
                      errorText={
                        field.value === undefined || field.value.length === 0
                          ? "This field is required"
                          : undefined
                      }
                    >
                      <div className="flex gap-3 items-center text-xs">
                        <span>
                          <ListCheck className="text-pri-700 h-3.5 w-3.5" />
                        </span>
                        <h4 className="text-xs font-medium uppercase tracking-wide text-ink-400">
                          Select Illness Types
                        </h4>
                      </div>

                      <IllnessTypes
                        options={[
                          {
                            value: "diabetes",
                            labelEn: "Diabetes",
                            labelNe: "मधुमेह",
                          },
                          {
                            value: "hypertension",
                            labelEn: "Hypertension",
                            labelNe: "उच्च रक्तचाप",
                          },
                          {
                            value: "heart",
                            labelEn: "Heart Disease",
                            labelNe: "मुखको रोग",
                          },
                          {
                            value: "respiratory",
                            labelEn: "Respiratory",
                            labelNe: "श्वासप्रश्वास",
                          },
                          {
                            value: "disability",
                            labelEn: "Disability",
                            labelNe: "अपाङ्गता",
                          },
                          {
                            value: "mental",
                            labelEn: "Mental Health",
                            labelNe: "मानसिक स्वास्थ्य",
                          },
                        ]}
                        value={field.value || []}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormField>
                  </div>
                )}
              />
            )}
          </div>
        </section>
      </div>
      <HealthFormFooter
        onPrevious={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </form>
  );
}
