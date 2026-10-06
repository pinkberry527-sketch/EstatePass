
import { useMutation } from "@tanstack/react-query";

import { logout } from "../../services/auth";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
