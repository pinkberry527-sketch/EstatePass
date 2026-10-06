
import { useMutation } from "@tanstack/react-query";

import { verifyInvitation } from "../../services/invitation";

import type {
  VerifyInvitationPayload,
  VerifyInvitationResponse,
} from "../../types/invitation";

export function useVerifyInvitation() {
  return useMutation<
    VerifyInvitationResponse,
    Error,
    VerifyInvitationPayload
  >({
    mutationFn: verifyInvitation,
  });
}

