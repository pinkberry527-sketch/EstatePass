
import { useState } from "react";

import { useAddHouseholdMember } from "../../hooks/estate/useHouseholdmenbers";

interface AddHouseholdMemberProps {
  onCancel: () => void;
}

export default function AddHouseholdMember({
  onCancel,
}: AddHouseholdMemberProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const addHouseholdMember = useAddHouseholdMember();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addHouseholdMember.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        relationship,
        phone_number: phoneNumber,
      },
      {
        onSuccess: () => {
          setFirstName("");
          setLastName("");
          setRelationship("");
          setPhoneNumber("");

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
          Add Household Member
        </h2>

        <p className="mt-1 text-sm text-estate-muted">
          Add a family member or other person who lives in your household.
        </p>
      </div>

      {addHouseholdMember.isError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            Unable to add household member. Please check the details and try
            again.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            First Name
          </label>

          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Enter first name"
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Last Name
          </label>

          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Enter last name"
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="relationship"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Relationship
          </label>

          <input
            id="relationship"
            type="text"
            value={relationship}
            onChange={(event) => setRelationship(event.target.value)}
            placeholder="e.g. Spouse, Child, Sibling"
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Phone Number
          </label>

          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="Enter phone number"
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={addHouseholdMember.isPending}
          className="rounded-xl border border-estate-border px-5 py-3 text-sm font-semibold text-estate-text transition hover:bg-estate-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={addHouseholdMember.isPending}
          className="rounded-xl bg-estate-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {addHouseholdMember.isPending ? "Adding..." : "Add Member"}
        </button>
      </div>
    </form>
  );
}

