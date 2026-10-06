export interface Visitor {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  photo: string | null;
  id_number: string;
  full_name?: string;
}

export interface VisitorPass {
  id: number;
  visitor: Visitor;
  estate: number;
  house: number;
  host: number;
  gate: number | null;
  access_code: string;
  visit_date: string;
  expected_arrival: string;
  expected_departure: string | null;
  purpose: string;
  status:
    | "PENDING"
    | "ACTIVE"
    | "USED"
    | "EXPIRED"
    | "CANCELLED";
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorPassPayload {
  visitor: {
    first_name: string;
    last_name: string;
    phone_number: string;
  };
  visit_date: string;
  expected_arrival: string;
  expected_departure?: string;
  purpose?: string;
  notes?: string;
}