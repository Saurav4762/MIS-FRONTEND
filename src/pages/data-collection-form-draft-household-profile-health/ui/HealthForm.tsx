import { HeartPulse, Info } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useId, useState } from "react";
import { FormField, Select } from "@shared/ui/Input";
import HealthFormFooter from "./HealthFormFooter";
import HealthSection from "./HealthSection";
import IllnessSelector from "./IllnessSelector";
import YesNoField, { type YesNoValue } from "./YesNoField";

const INSURANCE_PROVIDERS = [
  "Government Health Insurance",
  "Private Insurance",
  "Community Fund",
  "Other",
];

const ILLNESS_OPTIONS = [
  { id: "diabetes", label: "Diabetes", labelNe: "मधुमेह" },
  { id: "hypertension", label: "Hypertension", labelNe: "उच्च रक्तचाप" },
  { id: "heart-disease", label: "Heart Disease", labelNe: "मुटुको रोग" },
  { id: "respiratory", label: "Respiratory", labelNe: "श्वासप्रश्वास" },
  { id: "disability", label: "Disability", labelNe: "अपाङ्गता" },
  { id: "mental-health", label: "Mental Health", labelNe: "मानसिक स्वास्थ्य" },
];

const AWARENESS_FIELDS = [
  {
    key: "handwashing",
    label: "Family practices handwashing with soap?",
    labelNe: "परिवारले साबुन पानीले हात धुने अभ्यास गर्छ?",
    initialValue: "yes",
  },
  {
    key: "nutrition",
    label: "Family aware of balanced nutrition?",
    labelNe: "परिवार सन्तुलित पोषणको बारेमा सचेत छ?",
    initialValue: "no",
  },
  {
    key: "care",
    label: "Family aware of antenatal/postnatal care?",
    labelNe: "परिवार प्रसूतिपूर्व/पश्चात हेरचाहमा सचेत छ?",
    initialValue: "yes",
  },
  {
    key: "checkups",
    label: "Children under 5 receiving health checkups?",
    labelNe: "५ वर्ष मुनिका बालबालिकाको नियमित स्वास्थ्य जाँच?",
    initialValue: "yes",
  },
  {
    key: "supplements",
    label: "Iron/folic acid supplements received?",
    labelNe: "गर्भवती महिलाले आइरन/फोलिक एसिड चक्की प्रयोग?",
    initialValue: "yes",
  },
  {
    key: "vaccination",
    label: "Children fully vaccinated?",
    labelNe: "बालबालिकालाई पूर्ण खोप दिइएको छ?",
    initialValue: "yes",
  },
] satisfies Array<{
  key: string;
  label: string;
  labelNe: string;
  initialValue: YesNoValue;
}>;

type AwarenessState = Record<string, YesNoValue>;

const createInitialAwarenessState = (): AwarenessState =>
  AWARENESS_FIELDS.reduce<AwarenessState>((state, field) => {
    state[field.key] = field.initialValue;
    return state;
  }, {});

export default function HealthForm() {
  const navigate = useNavigate();
  const { surveyId } = useParams({
    from: "/_app/data-collection/forms/drafts/$surveyId/household-profile/health",
  });

  const insuranceProviderId = useId();
  const [awareness, setAwareness] = useState(createInitialAwarenessState);
  const [hasInsurance, setHasInsurance] = useState<YesNoValue>("yes");
  const [insuranceProvider, setInsuranceProvider] = useState(
    INSURANCE_PROVIDERS[0],
  );
  const [hasChronicIllness, setHasChronicIllness] = useState<YesNoValue>("no");
  const [selectedIllnessIds, setSelectedIllnessIds] = useState<string[]>([]);

  const updateAwareness = (key: string, value: YesNoValue) => {
    setAwareness((current) => ({ ...current, [key]: value }));
  };

  const toggleIllness = (id: string) => {
    setSelectedIllnessIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  };

  const goPrevious = () => {
    navigate({
      to: "/data-collection/forms/drafts/$surveyId/household-profile/facilities",
      params: { surveyId },
    });
  };

  const goNext = () => {
    navigate({
      to: "/data-collection/forms/drafts/$surveyId/household-profile/agriculture",
      params: { surveyId },
    });
  };

  return (
    <section className="relative flex flex-col h-full rounded-xl border border-ink-200 bg-white shadow-sm">
      <header className="flex items-center gap-4 border-b border-ink-200 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-pri-50 text-pri-600">
          <HeartPulse className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-ink-900">
            Sanitation & Health
          </h1>
          <p className="text-sm font-medium text-ink-400">
            स्वच्छता र स्वास्थ्य
          </p>
        </div>
      </header>

      <div className="overflow-y-auto flex-1 h-full flex flex-col">
        <form className="space-y-12 flex flex-1 flex-col px-17 py-13 pb-7.5">
          <HealthSection title="Section 01: Awareness" subtitle="तथ्यगत सचेतना">
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
              {AWARENESS_FIELDS.map((field) => (
                <YesNoField
                  key={field.key}
                  label={field.label}
                  labelSuffix={field.labelNe}
                  value={awareness[field.key]}
                  onChange={(value) => updateAwareness(field.key, value)}
                />
              ))}
            </div>
          </HealthSection>

          <HealthSection
            title="Section 02: Health Insurance"
            subtitle="स्वास्थ्य बीमा"
          >
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-8 md:grid-cols-2">
              <YesNoField
                label="Family Has Health Insurance?"
                labelSuffix="परिवारको स्वास्थ्य बीमा छ?"
                value={hasInsurance}
                onChange={setHasInsurance}
              />

              {hasInsurance === "yes" && (
                <FormField
                  as="div"
                  htmlFor={insuranceProviderId}
                  label="Insurance Provider"
                  labelSuffix="(बीमा प्रदायक)"
                  className="space-y-3"
                  labelClassName="flex-col items-start gap-1 text-[10px] uppercase tracking-tight text-ink-500 md:min-h-10"
                >
                  <Select
                    id={insuranceProviderId}
                    value={insuranceProvider}
                    options={INSURANCE_PROVIDERS}
                    onChange={(event) =>
                      setInsuranceProvider(event.target.value)
                    }
                  />
                </FormField>
              )}
            </div>
          </HealthSection>

          <HealthSection
            title="Section 03: Chronic Illness"
            subtitle="दीर्घकालीन रोग"
          >
            <YesNoField
              label="Any Member with Chronic Illness?"
              labelSuffix="परिवारमा कोही सदस्यलाई दीर्घकालीन रोग छ?"
              value={hasChronicIllness}
              onChange={setHasChronicIllness}
            />

            {hasChronicIllness === "yes" && (
              <IllnessSelector
                options={ILLNESS_OPTIONS}
                selectedIds={selectedIllnessIds}
                onToggle={toggleIllness}
              />
            )}
          </HealthSection>

          <aside className="mt-6 flex items-start gap-3 rounded-lg border border-pri-100 bg-pri-50 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-pri-600" />
            <div>
              <h4 className="mb-1 text-xs font-bold uppercase tracking-tight text-pri-700">
                Privacy & Security
              </h4>
              <p className="text-xs leading-relaxed text-ink-600">
                All data entered is encrypted and protected under the Bhadrapur
                Municipal Governance Digital Privacy Act 2024. Values are
                automatically saved as you progress.
              </p>
            </div>
          </aside>
        </form>
        <HealthFormFooter onPrevious={goPrevious} onNext={goNext} />
      </div>
    </section>
  );
}
