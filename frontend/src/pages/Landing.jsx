import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Benefits from "@/components/landing/Benefits";
import Tariffs from "@/components/landing/Tariffs";
import HowItWorks from "@/components/landing/HowItWorks";
import CityMap from "@/components/landing/CityMap";
import AppDownload from "@/components/landing/AppDownload";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <main data-testid="landing-page" className="min-h-screen bg-[#0a0a0a] text-white font-body">
      <Navigation />
      <Hero />
      <Marquee />
      <Benefits />
      <Tariffs />
      <HowItWorks />
      <CityMap />
      <AppDownload />
      <Footer />
    </main>
  );
}
