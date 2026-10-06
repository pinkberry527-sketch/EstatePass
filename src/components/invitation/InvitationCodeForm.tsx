import { useState } from "react";

type InvitationCodeFormProps = {
  onSubmit: (code: string) => void;
  isLoading: boolean;
  error?: string;
};

export default function InvitationCodeForm({
  onSubmit,
  isLoading,
  error,
}: InvitationCodeFormProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!code.trim()) {
      return;
    }

    onSubmit(code.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="invitation-code"
          className="block text-sm font-medium text-slate-700"
        >
          Invitation code
        </label>

        <input
          id="invitation-code"
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="EP-XXXXXX"
          required
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm uppercase tracking-widest outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Verifying..." : "Verify Invitation"}
      </button>
    </form>
  );
}