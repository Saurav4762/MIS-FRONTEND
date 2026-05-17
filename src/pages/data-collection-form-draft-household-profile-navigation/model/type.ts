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
    link: "/data-collection/forms/drafts/$surveyId/household-profile/member-details",
  },
  {
    id: "social-cultural",
    label: "Social / Cultural",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/social-cultural",
  },
  {
    id: "residence",
    label: "Residence",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/residence",
  },
  {
    id: "economic",
    label: "Economic",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/economic",
  },
  {
    id: "facilities",
    label: "Facilities",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/facilities",
  },
  {
    id: "health",
    label: "Health",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/health",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/agriculture",
  },
  {
    id: "livestock",
    label: "Livestock",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/livestock",
  },
  {
    id: "decision-making",
    label: "Decision Making",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/decision-making",
  },
  {
    id: "disaster",
    label: "Disaster",
    link: "/data-collection/forms/drafts/$surveyId/household-profile/disaster",
  },
  {
    id: "collector",
    label: "Collector",
    link: "/data-collection/forms/drafts/$surveyId/household-profile",
  },
];
