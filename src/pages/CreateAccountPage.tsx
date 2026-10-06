import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";

import { useRegisterEstateAdmin } from "../hooks/auth/useRegisterEstateAdmin";
import { usePublicEstates } from "../hooks/estate/usePublicEstate";

export default function CreateAccountPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [estate, setEstate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {
    data: estates,
    isLoading: isLoadingEstates,
    isError: isEstateError,
  } = usePublicEstates();

  const {
    mutate,
    isPending,
    isError,
    error,
  } = useRegisterEstateAdmin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    mutate(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
        estate: Number(estate),
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Create your EstatePass Estate Admin account."
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AuthInput
            id="firstName"
            label="First name"
            value={firstName}
            placeholder="First name"
            onChange={(event) => setFirstName(event.target.value)}
          />

          <AuthInput
            id="lastName"
            label="Last name"
            value={lastName}
            placeholder="Last name"
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <AuthInput
          id="email"
          label="Email address"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <AuthInput
          id="phoneNumber"
          label="Phone number"
          type="tel"
          value={phoneNumber}
          placeholder="Enter your phone number"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />

        <div>
          <label
            htmlFor="estate"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Select your estate
          </label>

          <select
            id="estate"
            value={estate}
            onChange={(event) => setEstate(event.target.value)}
            disabled={isLoadingEstates}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {isLoadingEstates
                ? "Loading estates..."
                : "Select your estate"}
            </option>

            {estates?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Create a password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <AuthInput
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {password &&
          confirmPassword &&
          password !== confirmPassword && (
            <p className="text-sm text-red-600">
              Passwords do not match.
            </p>
          )}

        {isEstateError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Unable to load estates. Please refresh and try again.
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Unable to create your account."}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isPending ||
            isLoadingEstates ||
            !estate ||
            password !== confirmPassword
          }
          className="mt-2 w-full rounded-xl bg-indigo-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-700/20 transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
}