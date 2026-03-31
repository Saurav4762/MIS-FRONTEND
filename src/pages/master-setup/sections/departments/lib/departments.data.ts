interface Department {
  id: number;
  departmentName: string;
  departmentCode: string;
  description: string;
  headName: string;
  headInitials: string;
  budget: string;
  status: "Active" | "Inactive";
}

// Mock data - replace with API call later
export const mockDepartments: Department[] = [
  {
    id: 1,
    departmentName: "Health Department",
    departmentCode: "HD",
    description: "Manages public health and medical services",
    headName: "Dr. Ramesh Poudel",
    headInitials: "RP",
    budget: "₹2,500,000",
    status: "Active",
  },
  {
    id: 2,
    departmentName: "Education Department",
    departmentCode: "ED",
    description: "Oversees schools and educational programs",
    headName: "Priya Sharma",
    headInitials: "PS",
    budget: "₹3,200,000",
    status: "Active",
  },
  {
    id: 3,
    departmentName: "Infrastructure Department",
    departmentCode: "ID",
    description: "Handles roads, water, and sanitation projects",
    headName: "Arun Nepal",
    headInitials: "AN",
    budget: "₹4,500,000",
    status: "Active",
  },
  {
    id: 4,
    departmentName: "Finance Department",
    departmentCode: "FD",
    description: "Manages municipal finances and budgets",
    headName: "Sunita Adhikari",
    headInitials: "SA",
    budget: "₹1,800,000",
    status: "Active",
  },
  {
    id: 5,
    departmentName: "Agriculture Department",
    departmentCode: "AD",
    description: "Promotes agricultural development and support",
    headName: "Gopal Simkhada",
    headInitials: "GS",
    budget: "₹1,200,000",
    status: "Inactive",
  },
];

export type { Department };
