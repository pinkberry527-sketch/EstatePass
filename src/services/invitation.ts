
import api from "../api/axios";

import type {
  VerifyInvitationPayload,
  VerifyInvitationResponse,
  AcceptInvitationPayload,
  AcceptInvitationResponse,
} from "../types/invitation";

export const verifyInvitation = async (
  payload: VerifyInvitationPayload,
): Promise<VerifyInvitationResponse> => {
  const response = await api.post(
    "auth/invitations/verify/",
    payload,
  );

  return response.data;
};





export const acceptInvitation = async (
  payload: AcceptInvitationPayload,
): Promise<AcceptInvitationResponse> => {
  const response = await api.post(
    "auth/invitations/accept/",
    payload,
  );

  return response.data;
};

