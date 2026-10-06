import { Link } from "react-router-dom";
import heroimg from "../../assets/estatepass-hero-visual.png";

const highlights = [
  { icon: "✓", label: "Secure Access" },
  { icon: "+", label: "Better Control" },
  { icon: "◷", label: "Real-Time Verification" },
  { icon: "#", label: "Multiple Estates" },
];

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-12 lg:px-4 ">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[560px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          <div className="relative z-10 max-w-xl">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center">
                <span className="text-2xl font-bold tracking-tight text-estate-text sm:text-3xl">
                  Estate<span className="text-estate-primary">Pass</span>
                </span>
              </Link>
              <p className="mt-1 text-sm font-medium text-estate-muted sm:text-base">
                Secure Access. Safer Communities.
              </p>
            </div>

            <span className="inline-flex rounded-full bg-estate-primary/10 px-4 py-2 text-xs font-semibold text-estate-primary sm:text-sm">
              Visitor Access Management
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-estate-text sm:text-5xl lg:text-6xl">
              Visitor Access
              <br />
              Made Simple
              <br />
              <span className="text-estate-primary">for Modern Estates</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-estate-muted sm:text-lg">
              Generate, manage and verify visitor codes — all in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="rounded-xl bg-estate-primary px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Get Started
              </Link>
              <a
                href="#how-it-works"
                className="rounded-xl border border-estate-border bg-white px-6 py-3.5 text-center text-sm font-semibold text-estate-text transition hover:bg-estate-background"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map(({ icon, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-estate-border bg-white/80 p-3 shadow-sm backdrop-blur"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-estate-primary/10 text-estate-primary">
                    {icon}
                  </div>
                  <p className="mt-2 text-xs font-semibold text-estate-text">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]">
            <div className="absolute right-0 top-1/2 h-[80%] w-[80%] -translate-y-1/2 rounded-full bg-estate-primary/10 blur-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
              <img
                src={heroimg}
                
                
                alt="EstatePass visitor access at a residential estate gate"
                className="h-full min-h-[200px] w-full object-cover object-center sm:min-h-[100px] lg:min-h-[200px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-estate-background/30 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-auto sm:right-8 sm:w-72">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-estate-muted">
                      Visitor Access Code
                    </p>
                    <p className="mt-1 text-xl font-bold tracking-[0.12em] text-estate-text">
                      EP-7843-2109
                    </p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-estate-background">
                  <div className="h-full w-full rounded-full bg-estate-primary" />
                </div>
                <p className="mt-2 text-xs text-estate-muted">
                  Ready for gate verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}