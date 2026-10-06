
import api from "../api/axios";
import type { AccessLogsResponse } from "../types/accessLogs";

export const getAccessLogs = async (
  page: number,
): Promise<AccessLogsResponse> => {
  const response = await api.get(
    `access-logs/?page=${page}`,
  );

  return response.data;
};

