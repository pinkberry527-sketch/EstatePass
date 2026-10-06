import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createResident,
  getHouses,
  getResidents,
  getSecurityOfficers,
  createSecurityOfficer,
} from "../../services/residents";

import type {
  CreateResidentPayload,
  CreateResidentResponse,
  CreateSecurityOfficerPayload,
} from "../../types/residents";

export function useHouses() {
  return useQuery({
    queryKey: ["houses"],
    queryFn: getHouses,
  });
}

export function useResidents() {
  return useQuery({
    queryKey: ["residents"],
    queryFn: getResidents,
  });
}

export function useCreateResident() {
  return useMutation<
    CreateResidentResponse,
    Error,
    CreateResidentPayload
  >({
    mutationFn: createResident,
  });
}

export function useSecurityOfficers() {
  return useQuery({
    queryKey: ["security-officers"],
    queryFn: getSecurityOfficers,
  });
}

export function useCreateSecurityOfficer() {
  return useMutation({
    mutationFn: (
      payload: CreateSecurityOfficerPayload,
    ) => createSecurityOfficer(payload),
  });
}