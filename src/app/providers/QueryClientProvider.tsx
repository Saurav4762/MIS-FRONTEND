import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { queryClient } from "@shared/api";
import type { ReactNode } from "react";
import { persister } from "@shared/lib/query-persister";

type Props = {
  children: ReactNode;
};

export function QueryClientProvider({ children }: Props) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return query.meta?.persist === true;
          },
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
