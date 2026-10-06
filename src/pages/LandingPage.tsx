import AboutSection from "../components/landing/AboutSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import LandingFooter from "../components/landing/LandingFooter";
import LandingHeader from "../components/landing/LandingHeader";
import LandingHero from "../components/landing/LandingHero";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-estate-background text-estate-text">
      <LandingHeader />
      <main>
        <LandingHero />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
      </main>
      <LandingFooter />
    </div>
  );
}
