import { Link } from "react-router-dom";
import logo from "../../assets/ESTATEPASSdarklogo.png";


const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Create Account", href: "/create-account" },
];

export default function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl  py-10 sm:px-6 ">
        {/* Main footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
          to="/"
          className="text-xl font-bold tracking-tight text-estate-primary"
        >
          <img width={120} src={logo} className=" object-contain" alt="" />
        </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              A smarter way to manage visitors, streamline estate access,
              and keep residential communities organized and secure.
            </p>

            <Link
              to="/create-account"
              className="mt-6 inline-flex items-center rounded-xl bg-estate-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Get Started
            </Link>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} EstatePass. All rights reserved.
          </p>

          <p>
            Built for modern residential estates.
          </p>
        </div>
      </div>
    </footer>
  );
}