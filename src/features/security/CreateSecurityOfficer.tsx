import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSecurityOfficer } from "../../hooks/residents/useCreateResident";

export default function CreateSecurityOfficerForm() {
  const navigate = useNavigate();

  const createSecurityOfficer = useCreateSecurityOfficer();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createSecurityOfficer.mutate(formData, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-estate-dark">
          Add Security Officer
        </h1>

        <p className="mt-2 text-sm text-estate-muted">
          Create an account for a security officer in your estate.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-estate-border bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-estate-dark">
              First Name
            </label>

            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-estate-border px-4 py-3 outline-none focus:border-estate-primary"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-estate-dark">
              Last Name
            </label>

            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-estate-border px-4 py-3 outline-none focus:border-estate-primary"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-estate-dark">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-estate-border px-4 py-3 outline-none focus:border-estate-primary"
            placeholder="security@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-estate-dark">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full rounded-lg border border-estate-border px-4 py-3 outline-none focus:border-estate-primary"
            placeholder="08012345678"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-estate-dark">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full rounded-lg border border-estate-border px-4 py-3 outline-none focus:border-estate-primary"
            placeholder="Minimum 8 characters"
          />
        </div>

        {createSecurityOfficer.isError && (
          <p className="text-sm text-red-600">
            Unable to create security officer. Please check the details and try again.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-lg border border-estate-border px-5 py-3 text-sm font-medium text-estate-dark"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createSecurityOfficer.isPending}
            className="rounded-lg bg-estate-primary px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createSecurityOfficer.isPending
              ? "Creating..."
              : "Create Security Officer"}
          </button>
        </div>
      </form>
    </div>
  );
}