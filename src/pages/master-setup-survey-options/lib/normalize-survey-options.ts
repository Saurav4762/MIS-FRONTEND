import type { SurveyDirectoryCategory, SurveyDirectoryPayload } from "../model";
import { fallbackSurveyDirectory } from "./survey-options.data";

type UnknownRecord = Record<string, unknown>;

const asArray = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : [];

const asRecord = (value: unknown): UnknownRecord =>
  value && typeof value === "object" ? (value as UnknownRecord) : {};

const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const pickArray = (record: UnknownRecord, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
};

const normalizeItems = (value: unknown) => {
  const items: SurveyDirectoryCategory["items"] = [];

  asArray(value).forEach((item, index) => {
    const record = asRecord(item);
    const nameEn = asString(record.nameEn || record.name || record.labelEn);
    const nameNe = asString(record.nameNe || record.labelNe || record.label);

    if (!nameEn && !nameNe) {
      return;
    }

    items.push({
      id:
        asString(record.id || record.uuid || record.value) ||
        `entry-${index + 1}`,
      code:
        asString(record.code || record.order || record.serial) ||
        String(index + 1).padStart(2, "0"),
      nameEn: nameEn || nameNe,
      nameNe: nameNe || nameEn,
    });
  });

  return items;
};

const normalizeCategories = (input: unknown): SurveyDirectoryCategory[] => {
  const categories: SurveyDirectoryCategory[] = [];

  asArray(input).forEach((category, index) => {
    const record = asRecord(category);
    const title =
      asString(record.title || record.nameEn || record.name || record.label) ||
      "";

    if (!title) {
      return;
    }

    categories.push({
      id:
        asString(record.id || record.uuid || record.key) ||
        `category-${index + 1}`,
      key:
        asString(record.key || record.slug || record.reference) ||
        `category_${index + 1}`,
      title,
      subtitle: asString(
        record.subtitle || record.description || record.desc,
        "Directory listing for survey master data.",
      ),
      buttonLabel: asString(record.buttonLabel, "Add Entry"),
      icon: asString(record.icon, "layout-list"),
      items: normalizeItems(
        record.items || record.entries || record.options || record.values,
      ),
    });
  });

  return categories;
};

export const normalizeSurveyDirectoryResponse = (
  response: unknown,
): SurveyDirectoryPayload => {
  const payload = asRecord(response);
  const categories = normalizeCategories(
    payload.categories ||
      payload.data ||
      payload.results ||
      pickArray(payload, ["categories", "data", "results"]),
  );

  if (categories.length > 0) {
    return {
      categories,
      source: "backend",
    };
  }

  return fallbackSurveyDirectory;
};
