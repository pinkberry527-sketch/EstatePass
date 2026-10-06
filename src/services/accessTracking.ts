import api from "../api/axios";

export type AccessTrackingResponse = {
  success: boolean;
  reason: string;
  checked_in_at?: string;
  checked_out_at?: string;
};

export const checkInVisitor = async (
  logId: number,
): Promise<AccessTrackingResponse> => {
  const response = await api.post(
    `access-logs/${logId}/check-in/`,
  );

  return response.data;
};

export const checkOutVisitor = async (
  logId: number,
): Promise<AccessTrackingResponse> => {
  const response = await api.post(
    `access-logs/${logId}/check-out/`,
  );

  return response.data;
};