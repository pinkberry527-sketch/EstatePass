import { useState } from "react";

import { useCreateVisitorPass } from "../../hooks/visitorpass/useVisitorPasses";

interface CreateVisitorPassProps {
  onCancel: () => void;
}

export default function CreateVisitorPass({
  onCancel,
}: CreateVisitorPassProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [visitDate, setVisitDate] = useState("");
  const [expectedArrival, setExpectedArrival] = useState("");
  const [expectedDeparture, setExpectedDeparture] = useState("");
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");

  const createVisitorPass = useCreateVisitorPass();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createVisitorPass.mutate(
      {
        visitor: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        },
        visit_date: visitDate,
        expected_arrival: expectedArrival,
        expected_departure: expectedDeparture,
        purpose,
        notes,
      },
      {
        onSuccess: () => {
          setFirstName("");
          setLastName("");
          setPhoneNumber("");

          setVisitDate("");
          setExpectedArrival("");
          setExpectedDeparture("");
          setPurpose("");
          setNotes("");

          onCancel();
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-estate-border bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-estate-text">
          Create Visitor Pass
        </h2>

        <p className="mt-1 text-sm text-estate-muted">
          Enter the details of the visitor you are expecting.
        </p>
      </div>

      {createVisitorPass.isError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            Unable to create visitor pass. Please check the details and try
            again.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="visitor-first-name"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            First Name
          </label>

          <input
            id="visitor-first-name"
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
            htmlFor="visitor-last-name"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Last Name
          </label>

          <input
            id="visitor-last-name"
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
            htmlFor="visitor-phone"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Phone Number
          </label>

          <input
            id="visitor-phone"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="Enter phone number"
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="visit-date"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Visit Date
          </label>

          <input
            id="visit-date"
            type="date"
            value={visitDate}
            onChange={(event) => setVisitDate(event.target.value)}
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="expected-arrival"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Expected Arrival
          </label>

          <input
            id="expected-arrival"
            type="time"
            value={expectedArrival}
            onChange={(event) => setExpectedArrival(event.target.value)}
            required
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary"
          />
        </div>

        <div>
          <label
            htmlFor="expected-departure"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Expected Departure
          </label>

          <input
            id="expected-departure"
            type="time"
            value={expectedDeparture}
            onChange={(event) => setExpectedDeparture(event.target.value)}
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition focus:border-estate-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="visitor-purpose"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Purpose
          </label>

          <input
            id="visitor-purpose"
            type="text"
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
            placeholder="e.g. Family visit, delivery, meeting"
            className="w-full rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="visitor-notes"
            className="mb-2 block text-sm font-medium text-estate-text"
          >
            Notes
          </label>

          <textarea
            id="visitor-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add any additional information"
            rows={4}
            className="w-full resize-none rounded-xl border border-estate-border bg-white px-4 py-3 text-sm text-estate-text outline-none transition placeholder:text-estate-muted focus:border-estate-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={createVisitorPass.isPending}
          className="rounded-xl border border-estate-border px-5 py-3 text-sm font-semibold text-estate-text transition hover:bg-estate-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={createVisitorPass.isPending}
          className="rounded-xl bg-estate-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createVisitorPass.isPending ? "Creating..." : "Create Visitor Pass"}
        </button>
      </div>
    </form>
  );
}
