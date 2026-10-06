import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-estate-border bg-estate-background p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-estate-primary/10 text-estate-primary">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-estate-text">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-estate-muted">
        {description}
      </p>
    </div>
  );
}