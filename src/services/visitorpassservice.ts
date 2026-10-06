import api from "../api/axios";

import type {
  VisitorPass,
  VisitorPassPayload,
} from "../types/visitorpass";

export async function getVisitorPasses(): Promise<VisitorPass[]> {
  const response = await api.get<VisitorPass[]>(
    "/visitor-passes/"
  );

  return response.data;
}

export async function createVisitorPass(
  data: VisitorPassPayload
): Promise<VisitorPass> {
  const response = await api.post<VisitorPass>(
    "/visitor-passes/",
    data
  );

  return response.data;
}

export async function activateVisitorPass(
  passId: number
): Promise<VisitorPass> {
  const response = await api.post<{
    detail: string;
    pass: VisitorPass;
  }>(`/visitor-passes/${passId}/activate/`);

  return response.data.pass;
}