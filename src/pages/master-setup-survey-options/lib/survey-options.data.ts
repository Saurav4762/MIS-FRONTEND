import type { SurveyDirectoryEntry, SurveyDirectoryPayload } from "../model";

const buildEntries = (
  values: Array<{ id: string; nameEn: string; nameNe: string }>,
): SurveyDirectoryEntry[] =>
  values.map((value, index) => ({
    ...value,
    code: String(index + 1).padStart(2, "0"),
  }));

export const fallbackSurveyDirectory: SurveyDirectoryPayload = {
  source: "fallback",
  categories: [
    {
      id: "land-type",
      key: "land_type",
      title: "Data Registry: Land Type",
      subtitle: "Global listing of recognized soil and terrain classifications",
      buttonLabel: "Add Type",
      icon: "layout-list",
      items: buildEntries([
        {
          id: "land-1",
          nameEn: "Residential Flat Land",
          nameNe: "आवासीय समतल जग्गा",
        },
        {
          id: "land-2",
          nameEn: "Commercial Slope",
          nameNe: "व्यावसायिक भिरालो जग्गा",
        },
        {
          id: "land-3",
          nameEn: "Agricultural Wetland",
          nameNe: "कृषि सिम जग्गा",
        },
        {
          id: "land-4",
          nameEn: "Industrial Terrain",
          nameNe: "औद्योगिक भूभाग",
        },
        {
          id: "land-5",
          nameEn: "Protected Forest Land",
          nameNe: "संरक्षित वन क्षेत्र",
        },
      ]),
    },
    {
      id: "house-type",
      key: "house_type",
      title: "Data Registry: House Type",
      subtitle:
        "Standardized residential and mixed-use building classifications",
      buttonLabel: "Add House Type",
      icon: "house",
      items: buildEntries([
        {
          id: "house-1",
          nameEn: "Detached Residential",
          nameNe: "एकल आवासीय घर",
        },
        {
          id: "house-2",
          nameEn: "Semi-Detached Housing",
          nameNe: "अर्ध-जोडिएको आवास",
        },
        {
          id: "house-3",
          nameEn: "Apartment Block",
          nameNe: "अपार्टमेन्ट भवन",
        },
        {
          id: "house-4",
          nameEn: "Mixed Commercial Residence",
          nameNe: "मिश्रित व्यापारिक आवास",
        },
      ]),
    },
    {
      id: "roof-type",
      key: "roof_type",
      title: "Data Registry: Roof Type",
      subtitle: "Roof construction options used during structural assessment",
      buttonLabel: "Add Roof Type",
      icon: "roof",
      items: buildEntries([
        {
          id: "roof-1",
          nameEn: "RCC Flat Roof",
          nameNe: "आर.सि.सि. समतल छाना",
        },
        {
          id: "roof-2",
          nameEn: "Truss Sheet Roof",
          nameNe: "ट्रस जस्ता छाना",
        },
        {
          id: "roof-3",
          nameEn: "Tile Roof",
          nameNe: "टायल छाना",
        },
        {
          id: "roof-4",
          nameEn: "Thatched Roof",
          nameNe: "फुसको छाना",
        },
      ]),
    },
    {
      id: "basement-structure",
      key: "basement_structure",
      title: "Data Registry: Basement Structure",
      subtitle: "Basement construction systems and foundational support types",
      buttonLabel: "Add Structure",
      icon: "building",
      items: buildEntries([
        {
          id: "basement-1",
          nameEn: "No Basement",
          nameNe: "तहखाना नभएको",
        },
        {
          id: "basement-2",
          nameEn: "Partial Basement",
          nameNe: "आंशिक तहखाना",
        },
        {
          id: "basement-3",
          nameEn: "Full Basement",
          nameNe: "पूर्ण तहखाना",
        },
      ]),
    },
    {
      id: "material-grade",
      key: "material_grade",
      title: "Data Registry: Material Grade",
      subtitle: "Construction material quality bands for survey verification",
      buttonLabel: "Add Grade",
      icon: "flask-conical",
      items: buildEntries([
        {
          id: "material-1",
          nameEn: "Premium Grade",
          nameNe: "उत्कृष्ट स्तर",
        },
        {
          id: "material-2",
          nameEn: "Standard Grade",
          nameNe: "मानक स्तर",
        },
        {
          id: "material-3",
          nameEn: "Economy Grade",
          nameNe: "आर्थिक स्तर",
        },
      ]),
    },
  ],
};
