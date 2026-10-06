import { useQuery } from "@tanstack/react-query";

import { getGates } from "../../services/visitorpass";

export function useGates() {
  return useQuery({
    queryKey: ["gates"],
    queryFn: getGates,
  });
}