import { useState } from "react";
import { FiUsers } from "react-icons/fi";

import {
  useDeleteHouseholdMember,
  useHouseholdMembers,
} from "../../hooks/estate/useHouseholdmenbers";

import type { HouseholdMember } from "../../types/household";

import EditHouseholdMember from "./EditHouseHoldMember";

export default function HouseholdMembers() {
  const {
    data: householdMembers = [],
    isLoading,
  } = useHouseholdMembers();

  const [editingMember, setEditingMember] =
    useState<HouseholdMember | null>(null);

  const [deletingMember, setDeletingMember] =
    useState<HouseholdMember | null>(null);

  const deleteHouseholdMember = useDeleteHouseholdMember();

  function handleDelete() {
    if (!deletingMember) {
      return;
    }

    deleteHouseholdMember.mutate(deletingMember.id, {
      onSuccess: () => {
        setDeletingMember(null);
      },
    });
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-estate-border bg-white p-6 shadow-sm">
        <p className="text-sm text-estate-muted">
          Loading household members...
        </p>
      </div>
    );
  }

  if (editingMember) {
    return (
      <EditHouseholdMember
        member={editingMember}
        onCancel={() => setEditingMember(null)}
      />
    );
  }

  if (householdMembers.length === 0) {
    return (
      <div className="rounded-2xl border border-estate-border bg-white p-10 text-center shadow-sm">
        <FiUsers
          size={32}
          className="mx-auto text-estate-muted"
        />

        <h2 className="mt-4 text-lg font-semibold text-estate-text">
          No household members yet
        </h2>

        <p className="mt-1 text-sm text-estate-muted">
          Add members of your household to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-estate-border bg-white p-6 shadow-sm">
        <div className="space-y-3">
          {householdMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-xl bg-estate-background px-4 py-4"
            >
              <div>
                <p className="font-medium text-estate-text">
                  {member.first_name} {member.last_name}
                </p>

                <p className="mt-1 text-sm text-estate-muted">
                  {member.relationship}
                </p>

                {member.phone_number && (
                  <p className="mt-1 text-sm text-estate-muted">
                    {member.phone_number}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(member)}
                  className="rounded-lg border border-estate-border px-3 py-2 text-sm font-medium text-estate-text transition hover:bg-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingMember(member)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deletingMember && (
        <div className="mt-4 rounded-2xl border border-estate-border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-estate-text">
            Delete Household Member?
          </h2>

          <p className="mt-2 text-sm text-estate-muted">
            Are you sure you want to delete{" "}
            <span className="font-medium text-estate-text">
              {deletingMember.first_name} {deletingMember.last_name}
            </span>
            ? This action cannot be undone.
          </p>

          {deleteHouseholdMember.isError && (
            <p className="mt-4 text-sm text-red-600">
              Unable to delete household member. Please try again.
            </p>
          )}

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeletingMember(null)}
              disabled={deleteHouseholdMember.isPending}
              className="rounded-xl border border-estate-border px-5 py-3 text-sm font-semibold text-estate-text transition hover:bg-estate-background disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteHouseholdMember.isPending}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleteHouseholdMember.isPending
                ? "Deleting..."
                : "Delete Member"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}