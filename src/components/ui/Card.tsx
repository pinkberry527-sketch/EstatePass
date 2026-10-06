type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-estate-border bg-estate-surface p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}