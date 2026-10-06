import {
  FiHome,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const roles = [
  {
    icon: <FiUsers size={22} />,
    title: "Residents",
    description: "Create and manage visitor passes for guests.",
  },
  {
    icon: <FiShield size={22} />,
    title: "Security Officers",
    description: "Verify visitor access quickly at the gate.",
  },
  {
    icon: <FiHome size={22} />,
    title: "Estate Admins",
    description: "Manage people, houses, and estate operations.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-estate-border bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Content */}
        <div>
          <p className="text-sm font-semibold text-estate-primary">
            ABOUT ESTATEPASS
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-estate-text sm:text-4xl">
            Making estate visitor management simpler and more secure
          </h2>

          <p className="mt-6 text-sm leading-7 text-estate-muted sm:text-base">
            Managing visitors shouldn't depend on handwritten registers,
            phone calls, or complicated gate processes. EstatePass brings
            residents, estate administrators, and security officers together
            on one platform.
          </p>

          <p className="mt-4 text-sm leading-7 text-estate-muted sm:text-base">
            From creating a visitor pass to verifying access at the gate,
            EstatePass helps estates keep visitor management organized,
            convenient, and easier to track.
          </p>
        </div>

        {/* Roles */}
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.title}
              className="flex items-start gap-4 rounded-2xl border border-estate-border bg-estate-background p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-estate-primary/10 text-estate-primary">
                {role.icon}
              </div>

              <div>
                <h3 className="font-semibold text-estate-text">
                  {role.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-estate-muted">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}