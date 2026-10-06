import ContactForm from "../components/contact/ContactForm";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-estate-background text-estate-text">
      <ContactHero />

      <main>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <ContactInfo />
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}