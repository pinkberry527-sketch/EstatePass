import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import InvitationCodeForm from "../components/invitation/InvitationCodeForm";
import SetPasswordForm from "../components/invitation/SetPasswordForm";

import { useAcceptInvitation, useVerifyInvitation } from "../hooks/invitation/useInvitation";

import type { VerifyInvitationResponse } from "../types/invitation";

export default function AcceptInvitationPage() {
  const navigate = useNavigate();

  const verifyInvitation = useVerifyInvitation();
  const acceptInvitation = useAcceptInvitation();

  const [invitation, setInvitation] =
    useState<VerifyInvitationResponse | null>(null);

  const [code, setCode] = useState("");

  const handleVerify = (invitationCode: string) => {
    setCode(invitationCode);

    verifyInvitation.mutate(
      {
        code: invitationCode,
      },
      {
        onSuccess: (data) => {
          setInvitation(data);
        },
      },
    );
  };

  const handleAccept = (
    password: string,
    confirmPassword: string,
  ) => {
    acceptInvitation.mutate({
      code,
      password,
      confirm_password: confirmPassword,
    });
  };

  if (acceptInvitation.isSuccess) {
    return (
      <AuthLayout
        title="Account activated"
        subtitle="Your EstatePass account is ready. You can now sign in."
        footerText="Already have an account?"
        footerLinkText="Login"
        footerLinkPath="/login"
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </div>

            <h2 className="mt-4 text-lg font-semibold text-emerald-900">
              Welcome to EstatePass!
            </h2>

            <p className="mt-2 text-sm leading-6 text-emerald-700">
              Your account has been activated successfully.
              You can now log in with your email and password.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={
        invitation
          ? "Create your password"
          : "Accept your invitation"
      }
      subtitle={
        invitation
          ? "Set a password to activate your EstatePass account."
          : "Enter the invitation code provided by your estate administrator."
      }
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkPath="/login"
    >
      {!invitation ? (
        <InvitationCodeForm
          onSubmit={handleVerify}
          isLoading={verifyInvitation.isPending}
          error={
            verifyInvitation.isError
              ? verifyInvitation.error.message
              : undefined
          }
        />
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Invitation verified
            </p>

            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              {invitation.user.first_name}{" "}
              {invitation.user.last_name}
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {invitation.user.email}
            </p>

            <p className="mt-3 text-sm text-slate-600">
              Estate:{" "}
              <span className="font-medium text-slate-900">
                {invitation.estate.name}
              </span>
            </p>
          </div>

          <SetPasswordForm
            onSubmit={handleAccept}
            isLoading={acceptInvitation.isPending}
            error={
              acceptInvitation.isError
                ? acceptInvitation.error.message
                : undefined
            }
          />
        </div>
      )}
    </AuthLayout>
  );
}