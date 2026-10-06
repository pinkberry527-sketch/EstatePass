export interface HouseholdMember {
  id: number;
  first_name: string;
  last_name: string;
  relationship: string;
  phone_number: string | null;
}

export interface HouseholdMemberPayload {
  first_name: string;
  last_name: string;
  relationship: string;
  phone_number?: string;
}