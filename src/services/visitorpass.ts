import api from "../api/axios";
import type {
  VerifyVisitorPassPayload,
  VerifiedVisitorPass,
} from "../types/visitorspass";
import type { Gate } from "../types/gates";

export const verifyVisitorPass = async (
  payload: VerifyVisitorPassPayload,
): Promise<VerifiedVisitorPass> => {
  const response = await api.post("visitor-passes/verify/", payload);

  return response.data;
};

export const getGates = async (): Promise<Gate[]> => {
  const response = await api.get("gates/");

  return response.data;
};
