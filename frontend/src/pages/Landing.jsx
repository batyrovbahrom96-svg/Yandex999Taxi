import Navigation from "@/components/landing/Navigation";
import MobileCTA from "@/components/landing/MobileCTA";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import WhyUs from "@/components/landing/WhyUs";
import Process from "@/components/landing/Process";
import Requirements from "@/components/landing/Requirements";
import Trust from "@/components/landing/Trust";
import FAQ from "@/components/landing/FAQ";
import LeadForm from "@/components/landing/LeadForm";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <main data-testid="landing-page" className="min-h-screen bg-[#050505] text-white font-body overflow-x-hidden">
      <Navigation />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Requirements />
      <Trust />
      <FAQ />
      <LeadForm />
      <FinalCTA />
      <Footer />
      <MobileCTA />
    </main>
  );
}
