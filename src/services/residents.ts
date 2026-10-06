import api from "../api/axios";
import type { MyHouse } from "../types/estate";

import type {
  CreateResidentPayload,
  CreateResidentResponse,
  House,
  Resident,
  SecurityOfficer,
  CreateSecurityOfficerPayload,
  CreatedSecurityOfficer,
} from "../types/residents";

export const getHouses = async (): Promise<House[]> => {
  const response = await api.get("estates/houses/");
  return response.data;
};

export const createResident = async (
  payload: CreateResidentPayload,
): Promise<CreateResidentResponse> => {
  const response = await api.post(
    "auth/residents/",
    payload,
  );

  return response.data;
};

export const getResidents = async (): Promise<Resident[]> => {
  const response = await api.get(
    "auth/residents/list/",
  );

  return response.data;
};

export const getSecurityOfficers = async (): Promise<SecurityOfficer[]> => {
  const response = await api.get(
    "auth/security-officers/list/",
  );

  return response.data;
};

export const createSecurityOfficer = async (
  payload: CreateSecurityOfficerPayload,
): Promise<CreatedSecurityOfficer> => {
  const response = await api.post(
    "auth/security-officers/",
    payload,
  );

  return response.data.officer;
};

export const getMyHouse = async (): Promise<MyHouse> => {
  const response = await api.get(
    "estates/my-house/",
  );

  return response.data;
};