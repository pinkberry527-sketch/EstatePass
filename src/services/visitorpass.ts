import api from "../api/axios";
import type {VerifyVisitorPassPayload,VerifiedVisitorPass,} from "../types/visitorspass";

export const verifyVisitorPass = async (payload: VerifyVisitorPassPayload): Promise<VerifiedVisitorPass> => {
  const response = await api.post(
    "visitor-passes/verify/",
    payload
  );

  return response.data;
};