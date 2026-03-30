import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { ApiError } from "./http";

const shouldRetry = (failureCount: number, error: unknown) => {
  if (failureCount >= 2) return false;
  const apiError = error as ApiError;

  if (apiError?.status) return false;

  if (
    apiError?.status >= 400 &&
    apiError?.status < 500 &&
    apiError?.status !== 429
  )
    return false;
  return true;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show toast if the query doesn't handle the error itself
      if (query.meta?.errorMessage) {
        console.error(`Query Error: ${query.meta.errorMessage}`);
        // toast.error(query.meta.errorMessage as string);
      } else {
        console.error("Something went wrong fetching data:", error);
        // toast.error('Failed to fetch data');
      }
    },
  }),
  // 3. Global Error Handling for Mutations (POST/PUT/DELETE requests)
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        console.error(`Mutation Error: ${mutation.meta.errorMessage}`);
        // toast.error(mutation.meta.errorMessage as string);
      } else {
        console.error("Action failed:", error);
        // toast.error('Action failed. Please try again.');
      }
    },
  }),
});
