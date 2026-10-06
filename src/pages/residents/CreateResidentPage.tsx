import { Link } from "react-router-dom";
import CreateResidentForm from "../../features/residents/CreateResidentForm";

export default function CreateResidentPage() {
  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-estate-primary hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <CreateResidentForm />
      </div>
    </section>
  );
}