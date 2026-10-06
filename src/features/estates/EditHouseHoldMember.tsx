
import { useState } from "react";

import { useUpdateHouseholdMember } from "../../hooks/estate/useHouseholdmenbers";

import type { HouseholdMember } from "../../types/household";

interface EditHouseholdMemberProps {
  member: HouseholdMember;
  onCancel: () => void;
}

export default function EditHouseholdMember({
  member,
  onCancel,
}: EditHouseholdMemberProps) {
  const [firstName, setFirstName] = useState(member.first_name);
  const [lastName, setLastName] = useState(member.last_name);
  const [relationship, setRelationship] = useState(member.relationship);
  const [phoneNumber, setPhoneNumber] = useState(
    member.phone_number || ""
  );

  const updateHouseholdMember = useUpdateHouseholdMember();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateHouseholdMember.mutate(
      {
        id: member.id,
        data: {
          first_name: firstName,
          last_name: lastName,
          relationship,
          phone_number: phoneNumber,
        },
      },
      {
        onSuccess: () => {
          onCancel();
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-estate-border bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-estate-text">
          Edit Household Member
        </h2>

        <p className="mt-1 text-sm text-estate-muted">
          Update this household member's information.
        </p>
      </div>

      {updateHouseholdMember.isError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            Unable to update household member. Please try again.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="edit-firstName"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            First Name
          </label>

          <input
            id="edit-firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="edit-lastName"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Last Name
          </label>

          <input
            id="edit-lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="edit-relationship"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Relationship
          </label>

          <input
            id="edit-relationship"
            type="text"
            value={relationship}
            onChange={(event) => setRelationship(event.target.value)}
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="edit-phoneNumber"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Phone Number
          </label>

          <input
            id="edit-phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={updateHouseholdMember.isPending}
          className="rounded-xl border border-estate-border px-5 py-3 text-sm font-semibold text-estate-text transition hover:bg-estate-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={updateHouseholdMember.isPending}
          className="rounded-xl bg-estate-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {updateHouseholdMember.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

