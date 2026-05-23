import { optionListKeys } from "../model";
import { useQuery } from "@tanstack/react-query";
import { getOptionList } from "../api";

export const useOptionList = () =>
  useQuery({
    queryKey: optionListKeys.all,
    queryFn: getOptionList,
  });
