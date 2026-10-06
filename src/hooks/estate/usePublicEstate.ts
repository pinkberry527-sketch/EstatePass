import { useQuery } from "@tanstack/react-query";

import { getPublicEstates } from "../../services/estateListservices";

export function usePublicEstates() {
  return useQuery({
    queryKey: ["public-estates"],
    queryFn: getPublicEstates,
  });
}