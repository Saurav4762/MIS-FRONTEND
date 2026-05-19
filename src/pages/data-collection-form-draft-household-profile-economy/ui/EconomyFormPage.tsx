import { useMemo, useState } from "react";
import { CircleDollarSign } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { FormField, Select } from "@shared/ui/Input";
import {
  CLASSIFICATION_OPTIONS,
  EXPENDITURE_FIELDS,
  INCOME_SOURCE_OPTIONS,
  LOAN_SOURCE_OPTIONS,
  createInitialExpenditure,
  type YesNoValue,
} from "../model";
import EconomyFormFooter from "./EconomyFormFooter";
import EconomyFormSection from "./EconomyFormSection";
import ExpenditureFields from "./ExpenditureFields";
import ExpenditureSummary from "./ExpenditureSummary";
import LoanToggle from "./LoanToggle";

export default function EconomyFormPage() {
  const navigate = useNavigate();
  const { caseId, householdId } = useParams({
    from: "/_app/data-collection/forms/drafts/$caseId/household-profile/$householdId/economic",
  });

  const [classification, setClassification] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [hasLoan, setHasLoan] = useState<YesNoValue>("yes");
  const [loanSource, setLoanSource] = useState("");
  const [expenditure, setExpenditure] = useState(createInitialExpenditure);

  const totalExpenditure = useMemo(
    () =>
      Object.values(expenditure).reduce((total, value) => {
        const amount = Number.parseFloat(value);
        return Number.isFinite(amount) ? total + amount : total;
      }, 0),
    [expenditure],
  );

  const updateExpenditure = (key: string, value: string) => {
    if (value.startsWith("-")) return;

    setExpenditure((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updateLoanStatus = (value: YesNoValue) => {
    setHasLoan(value);
    if (value === "no") {
      setLoanSource("");
    }
  };

  const goPrevious = () => {
    navigate({
      to: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/residence",
      params: { caseId, householdId },
    });
  };

  const goNext = () => {
    navigate({
      to: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/facilities",
      params: { caseId, householdId },
    });
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm">
      <header className="flex shrink-0 items-center gap-4 border-b border-ink-200 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-pri-50 text-pri-600">
          <CircleDollarSign className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-6 text-ink-900">
            Economic Status
          </h1>
          <p className="mt-0.5 text-sm font-bold uppercase tracking-wide text-ink-400">
            आर्थिक अवस्था
          </p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <form className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="mx-auto space-y-14 px-17 py-13 md:px-16 md:py-12">
            <EconomyFormSection
              title="Section 01: Status & Sources"
              subtitle="स्थिति र स्रोतहरू"
            >
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                <FormField
                  as="div"
                  label="Classification/Status"
                  labelSuffix="(आर्थिक वर्गीकरण/स्थिति)"
                  className="space-y-2"
                >
                  <Select
                    value={classification}
                    placeholder="Select Status"
                    options={CLASSIFICATION_OPTIONS}
                    onChange={(event) => setClassification(event.target.value)}
                  />
                </FormField>

                <FormField
                  as="div"
                  label="Main Income Source"
                  labelSuffix="(मुख्य आयस्रोत)"
                  className="space-y-2"
                >
                  <Select
                    value={incomeSource}
                    placeholder="Select Source"
                    options={INCOME_SOURCE_OPTIONS}
                    onChange={(event) => setIncomeSource(event.target.value)}
                  />
                </FormField>

                <LoanToggle value={hasLoan} onChange={updateLoanStatus} />

                <FormField
                  as="div"
                  label="Loan Source"
                  labelSuffix="(ऋणको स्रोत)"
                  className={`space-y-2 transition-opacity ${hasLoan === "no" ? "opacity-40" : ""}`}
                >
                  <Select
                    value={loanSource}
                    placeholder="Select Loan Source"
                    options={LOAN_SOURCE_OPTIONS}
                    disabled={hasLoan === "no"}
                    onChange={(event) => setLoanSource(event.target.value)}
                  />
                </FormField>
              </div>
            </EconomyFormSection>

            <EconomyFormSection
              title="Section 02: Annual Expenditure (NPR)"
              subtitle="वार्षिक खर्च (नेपाली रूपैयाँ)"
            >
              <ExpenditureFields
                fields={EXPENDITURE_FIELDS}
                values={expenditure}
                onChange={updateExpenditure}
              />
            </EconomyFormSection>

            <ExpenditureSummary total={totalExpenditure} />
          </div>
          <EconomyFormFooter onPrevious={goPrevious} onNext={goNext} />
        </form>
      </div>
    </section>
  );
}
