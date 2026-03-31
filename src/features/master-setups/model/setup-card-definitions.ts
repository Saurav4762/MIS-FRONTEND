import {
  Building2,
  Calendar,
  Landmark,
  Leaf,
  ListFilter,
  MapPin,
} from "lucide-react";
import type { MasterSetupCardDefinition } from "./types";

export const setupCardDefinitions: readonly MasterSetupCardDefinition[] = [
  {
    id: "municipality",
    title: "Municipality",
    description:
      "Manage administrative municipalities boundaries and their respective populations.",
    action: "Manage Municipality",
    href: "/master-setup/municipality",
    icon: Landmark,
  },
  {
    id: "wards",
    title: "Wards",
    description:
      "Manage administrative ward boundaries and their respective populations.",
    action: "Manage Wards",
    href: "/master-setup/wards",
    icon: MapPin,
  },
  {
    id: "toles",
    title: "Toles",
    description:
      "Define and categorize local neighborhoods and tole structures within each ward.",
    action: "Manage Toles",
    href: "/master-setup/toles",
    icon: Landmark,
  },
  {
    id: "departments",
    title: "Departments",
    description:
      "Organize municipal departments like Health, Education, and Infrastructure.",
    action: "Manage Departments",
    href: "/master-setup/departments",
    icon: Building2,
  },
  {
    id: "programs",
    title: "Programs",
    description:
      "Track municipal initiatives, social programs, and development campaigns.",
    action: "Manage Programs",
    href: "/master-setup/programs",
    icon: Leaf,
  },
  {
    id: "fiscal-years",
    title: "Fiscal Years",
    description:
      "Set up financial calendars, reporting periods, and yearly rollover rules.",
    action: "Manage Fiscal Years",
    href: "/master-setup/fiscal-years",
    icon: Calendar,
  },
  {
    id: "survey-options",
    title: "Survey Options",
    description:
      "Configure dynamic dropdowns (e.g., custom local locations, road types) for data collection forms.",
    action: "Manage Options",
    href: "/master-setup/survey-options",
    icon: ListFilter,
  },
];
