
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";

import { useLogin } from "../hooks/auth/useLogin";
import { useAuth } from "../hooks/auth/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, isAuthenticated, user, isLoading } = useAuth();

  const { mutate, isPending, isError, error } = useLogin();

  useEffect(() => {
    if (!isAuthenticated || isLoading || !user) {
      return;
    }

    navigate("/dashboard");
  }, [isAuthenticated, isLoading, user, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          login(data.access);
        },
      },
    );
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your EstatePass account to continue."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerLinkPath="/create-account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-indigo-700 transition hover:text-indigo-900"
          >
            Forgot password?
          </button>
        </div>

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-indigo-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-700/20 transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}

