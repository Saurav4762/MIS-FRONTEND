import { useFormDraftStore } from "@entities/case";
import { createResidenceNodeId, RESIDENCE_FORM_DEFAULT_VALUES } from "./residence-form-keys";
import type { ResidenceFormValues } from "./types";

const mergeResidenceDefaults = (
  values: Partial<ResidenceFormValues> | undefined,
): ResidenceFormValues => ({
  ...RESIDENCE_FORM_DEFAULT_VALUES,
  ...values,
});

export const getResidenceDraftKey = (surveyId: string, householdId: string) =>
  createResidenceNodeId(householdId) + `:${surveyId}`;

export const loadResidenceDraft = async (
  surveyId: string,
  householdId: string,
): Promise<ResidenceFormValues> => {
  const nodeId = createResidenceNodeId(householdId);
  const values = await useFormDraftStore.getState().loadDraftValues(surveyId, nodeId);

  return mergeResidenceDefaults(values as Partial<ResidenceFormValues> | undefined);
};

export const saveResidenceDraft = async (
  surveyId: string,
  householdId: string,
  values: ResidenceFormValues,
) => {
  const nodeId = createResidenceNodeId(householdId);
  return useFormDraftStore.getState().saveDraftValues(surveyId, nodeId, values);
};

export const getCachedResidenceDraft = (surveyId: string, householdId: string) => {
  const nodeId = createResidenceNodeId(householdId);
  const values = useFormDraftStore
    .getState()
    .getCachedDraftValues(surveyId, nodeId);

  return mergeResidenceDefaults(values as Partial<ResidenceFormValues> | undefined);
};