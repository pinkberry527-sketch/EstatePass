import { useMutation } from "@tanstack/react-query";

import { login } from "../../services/auth";

import type {
  LoginPayload,
  LoginResponse,
} from "../../types/auth";

export function useLogin() {
  return useMutation<
    LoginResponse,
    Error,
    LoginPayload
  >({
    mutationFn: login,
  });
}