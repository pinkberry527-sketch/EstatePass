import { useMutation } from "@tanstack/react-query";

import { registerEstateAdmin } from "../../services/estateAdminService";

export function useRegisterEstateAdmin() {
  return useMutation({
    mutationFn: registerEstateAdmin,
  });
}