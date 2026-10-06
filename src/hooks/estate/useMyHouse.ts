import { useQuery } from "@tanstack/react-query";
import { getMyHouse } from "../../services/residents";

export const useMyHouse = () => {
  return useQuery({
    queryKey: ["my-house"],
    queryFn: getMyHouse,
  });
};