import { Link } from "react-router-dom";
import logo from "../../assets/ESTATEPASSdarklogo.png";


export default function AuthBrandPanel() {
  return (
    <div className="relative hidden overflow-hidden  bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 p-12 text-white lg:flex">
      {/* Decorative shapes */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="absolute right-10 top-1/2 h-40 w-40 rounded-full bg-indigo-400/10 blur-2xl" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between">
        {/* Logo and introduction */}
        <div>
           <Link
          to="/"
          className="text-xl font-bold tracking-tight text-estate-primary"
        >
          <img width={150}  src={logo} className=" object-contain" alt="" />
        </Link>

          <div className="max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Smart Estate Access
            </p>

            <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
              Secure access.
              <br />
              Safer communities.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-indigo-100">
              Manage residents, visitors and estate access with one simple,
              secure platform built for modern communities.
            </p>
          </div>
        </div>

        {/* Bottom message */}
        <div className="flex items-center gap-3 text-sm text-indigo-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span>
            Trusted access management for modern estates
          </span>
        </div>
      </div>
    </div>
  );
}


