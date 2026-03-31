interface Ward {
  id: number;
  wardNumber: number;
  wardName: string;
  wardDistrict: string;
  tolesCount: number;
  representative: {
    initials: string;
    name: string;
  };
  status: "Active" | "Inactive";
}

// Mock data - replace with API call later
export const mockWards: Ward[] = [
  {
    id: 1,
    wardNumber: 1,
    wardName: "Ward 1",
    wardDistrict: "Central District",
    tolesCount: 8,
    representative: {
      initials: "RT",
      name: "Ram Bahadur Thapa",
    },
    status: "Active",
  },
  {
    id: 2,
    wardNumber: 2,
    wardName: "Ward 2",
    wardDistrict: "East District",
    tolesCount: 12,
    representative: {
      initials: "SS",
      name: "Sita Sharma",
    },
    status: "Active",
  },
  {
    id: 3,
    wardNumber: 3,
    wardName: "Ward 3",
    wardDistrict: "North District",
    tolesCount: 5,
    representative: {
      initials: "HK",
      name: "Hari Khadka",
    },
    status: "Inactive",
  },
];

export type { Ward };
