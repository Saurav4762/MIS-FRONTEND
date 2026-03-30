import { QueryClientProvider as QCP } from "@tanstack/react-query";
import { queryClient } from "@shared/api/query-client";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function QueryClientProvider({ children }: Props) {
  return <QCP client={queryClient}>{children}</QCP>;
}
