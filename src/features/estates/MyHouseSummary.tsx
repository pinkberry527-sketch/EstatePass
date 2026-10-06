
import { FiHome } from "react-icons/fi";
import { useMyHouse } from "../../hooks/estate/useMyHouse";

export default function MyHouseSummary() {
  const {
    data: house,
    isLoading,
    isError,
  } = useMyHouse();

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <FiHome
          size={20}
          className="text-estate-primary"
        />

        <h2 className="text-lg font-semibold text-estate-text">
          My House
        </h2>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-estate-border bg-white p-6">
          <p className="text-sm text-estate-muted">
            Loading your house information...
          </p>
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-estate-border bg-white p-6">
          <p className="text-sm text-red-600">
            Unable to load your house information.
          </p>
        </div>
      )}

      {house && (
        <div className="rounded-xl border border-estate-border bg-white p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-estate-muted">
                Property Number
              </p>

              <h3 className="mt-1 text-2xl font-semibold text-estate-text">
                {house.property_number}
              </h3>

              <p className="mt-2 text-sm text-estate-muted">
                {house.address}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:min-w-[280px]">
              <div>
                <p className="text-xs text-estate-muted">
                  Property Type
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {house.property_type}
                </p>
              </div>

              <div>
                <p className="text-xs text-estate-muted">
                  Status
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {house.is_occupied ? "Occupied" : "Vacant"}
                </p>
              </div>

              <div>
                <p className="text-xs text-estate-muted">
                  Relationship
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {house.relationship_type}
                </p>
              </div>

              <div>
                <p className="text-xs text-estate-muted">
                  Primary Resident
                </p>

                <p className="mt-1 text-sm font-medium text-estate-text">
                  {house.is_primary ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

