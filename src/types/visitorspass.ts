export type VerifyVisitorPassPayload = {
  access_code: string;
  estate_id: number;
};

export type VerifiedVisitorPass = {
  valid: boolean;
  pass: {
    id: number;
    access_code: string;
    visitor: string;
    house: string;
    host: string;
    gate: string | null;
    visit_date: string;
    expected_arrival: string;
    expected_departure: string | null;
    status: string;
  };
};