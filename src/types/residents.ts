export type House = {
  id: number;
  property_number: string;
  address: string;
  property_type: string;
  is_occupied: boolean;
};

export type ResidentRelationship =
  | "OWNER"
  | "TENANT"
  | "FAMILY"
  | "OTHER";

export type CreateResidentPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  house: number;
  relationship_type: ResidentRelationship;
  is_primary: boolean;
};

export type CreatedResident = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: "RESIDENT";
};

export type Resident = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: "RESIDENT";
  house: {
    id: number;
    property_number: string;
    relationship_type: ResidentRelationship;
    is_primary: boolean;
  } | null;
};

export type SecurityOfficer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: "SECURITY_OFFICER";
};

export type CreateSecurityOfficerPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  password: string;
};

export type CreatedSecurityOfficer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: "SECURITY";
};


export type CreateResidentResponse = {
  detail: string;

  resident: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
  };

  invitation: {
    code: string;
    expires_at: string;
  };
};