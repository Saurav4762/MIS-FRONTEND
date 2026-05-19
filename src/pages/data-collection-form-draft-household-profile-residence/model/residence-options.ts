export type SelectOption = {
	label: string;
	value: string;
	nepali?: string;
};

// Residence type options (from temp HTML: Residence Type)
export const RESIDENCE_TYPE_OPTIONS: SelectOption[] = [
	{ label: "Permanent", value: "permanent", nepali: "स्थायी" },
	{ label: "Temporary", value: "temporary", nepali: "अस्थायी" },
];

// Land / ownership options (from temp HTML: Land Ownership)
export const LAND_OWNERSHIP_OPTIONS: SelectOption[] = [
	{ label: "Own Land", value: "own", nepali: "आफ्नै जग्गा" },
	{ label: "Rented", value: "rent", nepali: "भाडामा" },
	{ label: "Public/Government", value: "public", nepali: "ऐलानी/सरकारी" },
];

// Generic yes/no options used by toggles
export const YES_NO_OPTIONS: SelectOption[] = [
	{ label: "Yes", value: "yes", nepali: "हो" },
	{ label: "No", value: "no", nepali: "होइन" },
];

// District options shown in migration example
export const DISTRICT_OPTIONS: SelectOption[] = [
	{ label: "Jhapa", value: "jhapa", nepali: "झापा" },
	{ label: "Morang", value: "morang", nepali: "मोरङ" },
	{ label: "Kathmandu", value: "kathmandu", nepali: "काठमाडौं" },
];

// Reasons for migration (from temp HTML: Reason for Migration)
export const REASON_FOR_MIGRATION_OPTIONS: SelectOption[] = [
	{ label: "Employment", value: "employment", nepali: "रोजगारी" },
	{ label: "Education", value: "education", nepali: "शिक्षा" },
	{ label: "Natural Disaster", value: "natural_disaster", nepali: "प्राकृतिक प्रकोप" },
	{ label: "Marriage", value: "marriage", nepali: "विवाह" },
	{ label: "Others", value: "others", nepali: "अन्य" },
];

// Map form field specific names to the source option sets extracted from HTML
export const OWNERSHIP_STATUS_OPTIONS = LAND_OWNERSHIP_OPTIONS;
export const HOUSING_TYPE_OPTIONS = RESIDENCE_TYPE_OPTIONS;

// Exports for selects present in the React form but not detailed in the HTML
// These are left as empty arrays so callers can fill them from other data sources.
export const ROOF_MATERIAL_OPTIONS: SelectOption[] = [];
export const FLOOR_MATERIAL_OPTIONS: SelectOption[] = [];
export const WATER_SOURCE_OPTIONS: SelectOption[] = [];
export const TOILET_FACILITY_OPTIONS: SelectOption[] = [];
export const YES_NO_LOOKUP: Record<string, string> = {
	yes: "Yes",
	no: "No",
};

