export type { ResidenceFormValues, ResidenceFormSectionId } from "./types";
export {
  RESIDENCE_FORM_TITLE,
  RESIDENCE_FORM_NODE_TYPE,
  RESIDENCE_FORM_KEY,
  RESIDENCE_FIELD_KEYS,
  RESIDENCE_FORM_DEFAULT_VALUES,
  createResidenceNodeId,
  createResidenceFormNode,
} from "./residence-form-keys";
export {
  OWNERSHIP_STATUS_OPTIONS,
  HOUSING_TYPE_OPTIONS,
  ROOF_MATERIAL_OPTIONS,
  FLOOR_MATERIAL_OPTIONS,
  WATER_SOURCE_OPTIONS,
  TOILET_FACILITY_OPTIONS,
  YES_NO_OPTIONS,
} from "./residence-form-options";
export {
  loadResidenceDraft,
  saveResidenceDraft,
  getCachedResidenceDraft,
  getResidenceDraftKey,
} from "./residence-form-store";