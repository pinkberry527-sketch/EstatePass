import FeatureCard from "./FeaturedCard";
import { FiKey, FiShield, FiUsers, FiCheckCircle } from "react-icons/fi";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-t border-estate-border bg-white px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold text-estate-primary">FEATURES</p>
        <h2 className="mt-2 text-3xl font-bold text-estate-text">
          Everything you need for visitor management
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-estate-muted sm:text-base">
          Manage visitor access and improve coordination between residents,
          estate administrators, and security officers.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={<FiUsers size={24} />}
          title="Visitor Passes"
          description="Residents can create visitor passes before their guests arrive at the estate."
        />

         <FeatureCard
            icon={<FiKey size={24} />}
            title="Secure Access Codes"
            description="Generate unique access codes that make visitor identification quick and simple."
          />

          <FeatureCard
            icon={<FiShield size={24} />}
            title="Estate Management"
            description="Estate administrators can manage residents, houses, and security officers from one place."
          />


           <FeatureCard
            icon={<FiCheckCircle size={24} />}
            title="Gate Verification"
            description="Security officers can verify visitor passes and record access directly at the gate."
          />
      </div>
    </section>
  );
}
