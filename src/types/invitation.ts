
export type VerifyInvitationPayload = {
  code: string;
};

export type VerifyInvitationResponse = {
  valid: boolean;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  estate: {
    id: number;
    name: string;
  };
};

export type AcceptInvitationPayload = {
  code: string;
  password: string;
  confirm_password: string;
};

export type AcceptInvitationResponse = {
  detail: string;
};

