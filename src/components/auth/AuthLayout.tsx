
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import AuthBrandPanel from "./AuthBrandpannel";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkPath: string;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkPath,
}: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="grid min-h-[600px] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        {/* Brand side */}
        <AuthBrandPanel />

        {/* Form side */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {subtitle}
              </p>
            </div>

            {/* Page form */}
            {children}

            {/* Footer navigation */}
            <div className="mt-8 text-center text-sm text-slate-500">
              {footerText}{" "}
              <button
                type="button"
                onClick={() => navigate(footerLinkPath)}
                className="font-semibold text-indigo-700 transition hover:text-indigo-900"
              >
                {footerLinkText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

