import { Link } from "react-router-dom";
import logo from "../../assets/ESTATEPASSlightlogo.png";

export default function LandingHeader() {
  return (
    <header className="border-b border-estate-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between  ">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-estate-primary"
        >
          <img width={150}  src={logo} className=" object-contain" alt="" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-estate-muted transition hover:text-estate-primary"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-estate-muted transition hover:text-estate-primary"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="text-sm text-estate-muted transition hover:text-estate-primary"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-estate-text transition hover:bg-estate-background sm:px-4"
          >
            Log in
          </Link>
          <Link
            to="/create-account"
            className="rounded-lg bg-estate-primary px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 sm:px-4"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}