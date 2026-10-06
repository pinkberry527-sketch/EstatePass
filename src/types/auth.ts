
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access: string;
};

export type CurrentUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
};

export interface EstateOption {
  id: number;
  name: string;
}

export interface EstateAdminRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  estate: number;
}

export interface EstateAdminRegisterResponse {
  detail: string;
  estate_admin: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
  };
}

