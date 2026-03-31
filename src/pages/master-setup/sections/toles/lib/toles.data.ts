interface Tole {
  id: number;
  toleName: string;
  sector: string;
  parentWard: string;
  landmarks: string;
  status: "Active" | "Inactive";
}

export const mockToles: Tole[] = [
  {
    id: 1,
    toleName: "Milan Tole",
    sector: "Inner Sector",
    parentWard: "Ward 1",
    landmarks: "Milan Chowk, Janata School",
    status: "Active",
  },
  {
    id: 2,
    toleName: "Shanti Nagar",
    sector: "Highway Side",
    parentWard: "Ward 2",
    landmarks: "Shanti Park",
    status: "Active",
  },
];

export type { Tole };
