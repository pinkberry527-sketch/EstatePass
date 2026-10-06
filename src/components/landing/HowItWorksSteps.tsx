import type { ReactNode } from "react";

interface HowItWorksStepProps {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export default function HowItWorksStep({
  number,
  icon,
  title,
  description,
}: HowItWorksStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-estate-primary text-white shadow-lg shadow-estate-primary/20">
          {icon}
        </div>

        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-estate-background text-xs font-bold text-estate-primary shadow-sm">
          {number}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-estate-text">
        {title}
      </h3>

      <p className="mt-3 max-w-xs text-sm leading-6 text-estate-muted">
        {description}
      </p>
    </div>
  );
}