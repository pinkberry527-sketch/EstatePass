import api from "../api/axios";
import type {
  EstateAdminRegisterData,
  EstateAdminRegisterResponse,
} from "../types/auth";

export async function registerEstateAdmin(
  data: EstateAdminRegisterData,
): Promise<EstateAdminRegisterResponse> {
  const response = await api.post<EstateAdminRegisterResponse>(
    "/auth/register/estate-admin/",
    data,
  );

  return response.data;
}