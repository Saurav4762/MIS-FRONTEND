interface FiscalYear {
  id: number;
  fiscalYear: string;
  startDate: string;
  endDate: string;
  budget: string;
  totalProjects: number;
  completedProjects: number;
  status: "Active" | "Completed" | "Planned";
}

// Mock data - replace with API call later
export const mockFiscalYears: FiscalYear[] = [
  {
    id: 1,
    fiscalYear: "2081/82",
    startDate: "July 16, 2024",
    endDate: "July 15, 2025",
    budget: "₹50,000,000",
    totalProjects: 25,
    completedProjects: 12,
    status: "Active",
  },
  {
    id: 2,
    fiscalYear: "2080/81",
    startDate: "July 17, 2023",
    endDate: "July 16, 2024",
    budget: "₹45,000,000",
    totalProjects: 28,
    completedProjects: 28,
    status: "Completed",
  },
  {
    id: 3,
    fiscalYear: "2079/80",
    startDate: "July 18, 2022",
    endDate: "July 17, 2023",
    budget: "₹42,000,000",
    totalProjects: 22,
    completedProjects: 22,
    status: "Completed",
  },
  {
    id: 4,
    fiscalYear: "2082/83",
    startDate: "July 15, 2025",
    endDate: "July 14, 2026",
    budget: "₹55,000,000",
    totalProjects: 30,
    completedProjects: 0,
    status: "Planned",
  },
];

export type { FiscalYear };
