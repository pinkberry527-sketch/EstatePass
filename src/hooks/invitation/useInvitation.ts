import { useMutation } from "@tanstack/react-query";

import {
  verifyInvitation,
  acceptInvitation,
} from "../../services/invitation";

import type {
  VerifyInvitationPayload,
  VerifyInvitationResponse,
  AcceptInvitationPayload,
  AcceptInvitationResponse,
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

export function useAcceptInvitation() {
  return useMutation<
    AcceptInvitationResponse,
    Error,
    AcceptInvitationPayload
  >({
    mutationFn: acceptInvitation,
  });
}