import { useState } from "react";

import {
  useCreateResident,
  useHouses,
} from "../../hooks/residents/useCreateResident";

import type {
  ResidentRelationship,
} from "../../types/residents";

export default function CreateResidentForm() {
  const { data: houses, isLoading: housesLoading } = useHouses();
  const createResident = useCreateResident();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    house: "",
    relationship_type: "TENANT" as ResidentRelationship,
    is_primary: false,
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.house) {
      return;
    }

    createResident.mutate({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone_number: form.phone_number,
      house: Number(form.house),
      relationship_type: form.relationship_type,
      is_primary: form.is_primary,
    });
  };

  const handleCopyCode = async () => {
    if (!createResident.data?.invitation.code) {
      return;
    }

    await navigator.clipboard.writeText(
      createResident.data.invitation.code,
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="rounded-2xl border border-estate-border bg-estate-surface shadow-sm">
        {/* Header */}
        <div className="border-b border-estate-border px-4 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-estate-text sm:text-xl">
            Create Resident
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-estate-muted">
            Create a resident account and assign them to a
            house in your estate.
          </p>
        </div>

        {/* Form body */}
        <div className="space-y-7 px-4 py-6 sm:px-6 sm:py-8">
          {/* Personal information */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-estate-text">
                Personal information
              </h3>

              <p className="mt-1 text-xs text-estate-muted">
                Enter the resident's basic information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  First Name
                </label>

                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                  className="w-full rounded-xl border border-estate-border bg-estate-background px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/10"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  Last Name
                </label>

                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required
                  className="w-full rounded-xl border border-estate-border bg-estate-background px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/10"
                />
              </div>
            </div>
          </section>

          {/* Contact information */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-estate-text">
                Contact information
              </h3>

              <p className="mt-1 text-xs text-estate-muted">
                These details will be associated with the
                resident's account.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="resident@example.com"
                  required
                  className="w-full rounded-xl border border-estate-border bg-estate-background px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/10"
                />
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  Phone Number
                  <span className="ml-1 text-xs font-normal text-estate-muted">
                    (optional)
                  </span>
                </label>

                <input
                  id="phone_number"
                  type="tel"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="08012345678"
                  className="w-full rounded-xl border border-estate-border bg-estate-background px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/10"
                />
              </div>
            </div>
          </section>

          {/* Estate assignment */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-estate-text">
                Estate assignment
              </h3>

              <p className="mt-1 text-xs text-estate-muted">
                Assign the resident to a house and specify
                their relationship.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="house"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  House
                </label>

                <select
                  id="house"
                  name="house"
                  value={form.house}
                  onChange={handleChange}
                  required
                  disabled={housesLoading}
                  className="w-full rounded-xl border border-estate-border bg-estate-background px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {housesLoading
                      ? "Loading houses..."
                      : "Select a house"}
                  </option>

                  {houses?.map((house) => (
                    <option
                      key={house.id}
                      value={house.id}
                    >
                      {house.property_number}
                      {house.address
                        ? ` — ${house.address}`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="relationship_type"
                  className="mb-2 block text-sm font-medium text-estate-text"
                >
                  Relationship
                </label>

                <select
                  id="relationship_type"
                  name="relationship_type"
                  value={form.relationship_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-estate-border bg-estate-background px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary focus:ring-2 focus:ring-estate-primary/10"
                >
                  <option value="OWNER">
                    Owner
                  </option>

                  <option value="TENANT">
                    Tenant
                  </option>

                  <option value="FAMILY">
                    Family Member
                  </option>

                  <option value="OTHER">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-estate-border bg-estate-background p-4">
              <input
                type="checkbox"
                checked={form.is_primary}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    is_primary: event.target.checked,
                  }))
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-estate-primary"
              />

              <span>
                <span className="block text-sm font-medium text-estate-text">
                  Make this resident the primary resident
                </span>

                <span className="mt-1 block text-xs leading-5 text-estate-muted">
                  Primary residents can be identified as the
                  main resident associated with this house.
                </span>
              </span>
            </label>
          </section>

          {/* Error */}
          {createResident.isError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">
                Failed to create resident.
              </p>

              <p className="mt-1 text-xs text-red-600">
                Please check the information and try again.
              </p>
            </div>
          )}

          {/* Success + invitation */}
          {createResident.isSuccess && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-800">
                Resident created successfully.
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                Give the invitation code below to the
                resident so they can activate their account.
              </p>

              <div className="mt-5 rounded-xl border border-emerald-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-estate-muted">
                  Invitation Code
                </p>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-2xl font-bold tracking-widest text-estate-text">
                    {createResident.data.invitation.code}
                  </p>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="rounded-lg bg-estate-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>

                <p className="mt-3 text-xs text-estate-muted">
                  This invitation expires in 7 days.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-estate-border px-4 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-6">
          <button
            type="submit"
            disabled={createResident.isPending}
            className="w-full rounded-xl bg-estate-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-estate-primary/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {createResident.isPending
              ? "Creating Resident..."
              : "Create Resident"}
          </button>
        </div>
      </div>
    </form>
  );
}