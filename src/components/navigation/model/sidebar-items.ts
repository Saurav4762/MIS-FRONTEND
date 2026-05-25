import {
  Bell,
  ChartColumn,
  CheckCircle2,
  Cog,
  Download,
  FileEdit,
  FileStack,
  Folder,
  LayoutDashboard,
  NotebookText,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { LinkProps } from "@tanstack/react-router";

// Extract only valid registered route paths
// type ValidPath = keyof FileRoutesByPath;
type ValidPath = NonNullable<LinkProps["to"]>;

export type SidebarItem = {
  label: string;
  icon: LucideIcon;
  path: ValidPath;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "MAIN OPERATIONS",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Reports", icon: ChartColumn, path: "/reports" },
      { label: "Data Collection", icon: FileEdit, path: "/data-collection" },
      { label: "Bulk Import", icon: Download, path: "/bulk-import" },
      {
        label: "Review & Approval",
        icon: CheckCircle2,
        path: "/review-approval",
      },
    ],
  },
  {
    title: "CONFIGURATION",
    items: [
      { label: "Master Setup", icon: Folder, path: "/master-setup" },
      { label: "Form Settings", icon: NotebookText, path: "/form-settings" },
      { label: "Users & Roles", icon: Users, path: "/users-roles" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Audit Log", icon: FileStack, path: "/audit-log" },
      { label: "Notifications", icon: Bell, path: "/notifications" },
      { label: "Settings", icon: Cog, path: "/settings" },
      { label: "LogOut", icon: FileStack, path: "/log-out" },
    ],
  },
];
