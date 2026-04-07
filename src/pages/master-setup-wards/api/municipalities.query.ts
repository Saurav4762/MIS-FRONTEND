import { useQuery } from "@tanstack/react-query";

import { searchMunicipalities } from "./municipalities.api";
import { municipalitiesKeys } from "./municipalities.keys";
import type { Municipality } from "../model";

export const useSearchMunicipalities = (keyword: string) => {
  const normalizedKeyword = keyword.trim();

  return useQuery<Municipality[]>({
    queryKey: municipalitiesKeys.search(normalizedKeyword),
    queryFn: () => searchMunicipalities(normalizedKeyword),
    enabled: normalizedKeyword.length > 0,
  });
};
