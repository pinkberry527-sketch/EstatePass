import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createVisitorPass,
  getVisitorPasses,
   activateVisitorPass,
} from "../../services/visitorpassservice";

import type {
  VisitorPassPayload,
} from "../../types/visitorpass";

export function useVisitorPasses() {
  return useQuery({
    queryKey: ["visitor-passes"],
    queryFn: getVisitorPasses,
  });
}

export function useCreateVisitorPass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VisitorPassPayload) =>
      createVisitorPass(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["visitor-passes"],
      });
    },
  });
}

export function useActivateVisitorPass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (passId: number) =>
      activateVisitorPass(passId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["visitor-passes"],
      });
    },
  });
}