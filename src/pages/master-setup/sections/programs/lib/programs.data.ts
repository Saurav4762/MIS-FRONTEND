interface Program {
  id: number;
  programName: string;
  programCode: string;
  department: string;
  description: string;
  startYear: string;
  beneficiaries: number;
  status: "Active" | "Inactive" | "Planned";
}

// Mock data - replace with API call later
export const mockPrograms: Program[] = [
  {
    id: 1,
    programName: "COVID-19 Vaccination Drive",
    programCode: "CVD-2024",
    department: "Health Department",
    description: "Mass vaccination program for community health",
    startYear: "2024",
    beneficiaries: 5000,
    status: "Active",
  },
  {
    id: 2,
    programName: "Primary Education Support",
    programCode: "PES-2024",
    department: "Education Department",
    description: "Scholarship and learning materials for primary students",
    startYear: "2024",
    beneficiaries: 3200,
    status: "Active",
  },
  {
    id: 3,
    programName: "Road Construction Project",
    programCode: "RCP-2024",
    department: "Infrastructure Department",
    description: "Construction of 20 km of new roads in rural areas",
    startYear: "2024",
    beneficiaries: 8500,
    status: "Active",
  },
  {
    id: 4,
    programName: "Clean Water Initiative",
    programCode: "CWI-2024",
    department: "Infrastructure Department",
    description: "Installation of water systems in remote villages",
    startYear: "2024",
    beneficiaries: 2100,
    status: "Planned",
  },
  {
    id: 5,
    programName: "Women Empowerment Training",
    programCode: "WET-2023",
    department: "Education Department",
    description: "Vocational training for women entrepreneurs",
    startYear: "2023",
    beneficiaries: 450,
    status: "Inactive",
  },
];

export type { Program };
