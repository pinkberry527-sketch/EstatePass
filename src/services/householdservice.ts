import api from "../api/axios";
import type {
  HouseholdMember,
  HouseholdMemberPayload,
} from "../types/household";

export async function getHouseholdMembers(): Promise<HouseholdMember[]> {
  const response = await api.get<HouseholdMember[]>("estates/household-members/");

  return response.data;
}

export async function addHouseholdMember(
  data: HouseholdMemberPayload,
): Promise<HouseholdMember> {
  const response = await api.post<HouseholdMember>("estates/household-members/", data);

  return response.data;
}

export async function updateHouseholdMember(
  id: number,
  data: HouseholdMemberPayload,
): Promise<HouseholdMember> {
  const response = await api.patch<HouseholdMember>(
    `estates/household-members/${id}/`,
    data,
  );
  return response.data;
}
export async function deleteHouseholdMember(id: number): Promise<void> {
  await api.delete(`estates/household-members/${id}/`);
}
