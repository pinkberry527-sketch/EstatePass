import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addHouseholdMember,
  getHouseholdMembers,
  updateHouseholdMember,
  deleteHouseholdMember,
} from "../../services/householdservice";

import type { HouseholdMemberPayload } from "../../types/household";

export function useHouseholdMembers() {
  return useQuery({
    queryKey: ["household-members"],
    queryFn: getHouseholdMembers,
  });
}

export function useAddHouseholdMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HouseholdMemberPayload) =>
      addHouseholdMember(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["household-members"],
      });
    },
  });
}

export function useUpdateHouseholdMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: HouseholdMemberPayload;
    }) => updateHouseholdMember(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["household-members"],
      });
    },
  });
}

export function useDeleteHouseholdMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteHouseholdMember(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["household-members"],
      });
    },
  });
}

