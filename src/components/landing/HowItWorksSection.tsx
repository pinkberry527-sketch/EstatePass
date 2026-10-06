import {
  FiUserPlus,
  FiSend,
  FiShield,
} from "react-icons/fi";

import HowItWorksStep from "./HowItWorksSteps";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-estate-border bg-estate-background px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold text-estate-primary">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-estate-text">
            A simpler way to manage visitors
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-estate-muted sm:text-base">
            Create visitor passes, share access codes, and support smoother
            verification at the estate gate.
          </p>
        </div>

        <div className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          <HowItWorksStep
            number="1"
            icon={<FiUserPlus size={25} />}
            title="Create a visitor pass"
            description="Residents create a visitor pass with the guest's details and expected visit information."
          />

          <HowItWorksStep
            number="2"
            icon={<FiSend size={25} />}
            title="Share the access code"
            description="The visitor receives a unique access code that can be presented when arriving at the estate."
          />

          <HowItWorksStep
            number="3"
            icon={<FiShield size={25} />}
            title="Verify at the gate"
            description="Security verifies the access code and confirms the visitor's authorization before entry."
          />
        </div>
      </div>
    </section>
  );
}