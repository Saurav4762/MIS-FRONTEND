import { optionListKeys } from "./option-list.keys";
import { useQuery } from "@tanstack/react-query";
import { getOptionList } from "./option-list.api";

export const useOptionList = () =>
  useQuery({
    queryKey: optionListKeys.all,
    queryFn: getOptionList,
  });
