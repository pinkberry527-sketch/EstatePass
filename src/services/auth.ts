
import api from "../api/axios";

import type {
  CurrentUser,
  LoginPayload,
  LoginResponse,
} from "../types/auth";

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post(
    "auth/login/",
    payload
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const response = await api.get("auth/me/");

  return response.data;
};


export const logout = async (): Promise<void> => {
  await api.post("auth/logout/");
};



