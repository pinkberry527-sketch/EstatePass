import api from "../api/axios";

import type { EstateOption } from "../types/auth";

export async function getPublicEstates(): Promise<EstateOption[]> {
  const response = await api.get<EstateOption[]>("/estates/public/");

  return response.data;
}