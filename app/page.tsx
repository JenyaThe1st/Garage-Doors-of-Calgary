import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Projects } from "@/components/home/Projects";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <ServicesSection />
      <BeforeAfter />
      <WhyChooseUs />
      <FinalCTA />
      <Projects />
    </main>
  );
}
