import type { LinkProps } from "@tanstack/react-router";

export interface FamilySection {
  id: string;
  label: string;
  link: LinkProps["to"];
}

export const FAMILY_SECTIONS: FamilySection[] = [
  {
    id: "member-details",
    label: "Member Details",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/member-details",
  },
  {
    id: "social-cultural",
    label: "Social / Cultural",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/social-cultural",
  },
  {
    id: "residence",
    label: "Residence",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/residence",
  },
  {
    id: "economic",
    label: "Economic",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/economic",
  },
  {
    id: "facilities",
    label: "Facilities",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/facilities",
  },
  {
    id: "health",
    label: "Health",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/health",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/agriculture",
  },
  {
    id: "livestock",
    label: "Livestock",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/livestock",
  },
  {
    id: "decision-making",
    label: "Decision Making",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/decision-making",
  },
  {
    id: "disaster",
    label: "Disaster",
    link: "/data-collection/forms/drafts/$caseId/household-profile/$householdId/disaster",
  },
  // {
  //   id: "collector",
  //   label: "Collector",
  //   link: "/data-collection/forms/drafts/$caseId",
  // },
];
