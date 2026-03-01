import { draftMode } from "next/headers";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import QuoteSection from "@/components/QuoteSection";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import Transformations from "@/components/Transformations";
import { getQuote, getServices, getTestimonials } from "@/app/lib/sanity-data";

export default async function Home() {
  const { isEnabled: isDraft } = await draftMode();
  const [testimonials, quote, services] = await Promise.all([
    getTestimonials(isDraft),
    getQuote(isDraft),
    getServices(isDraft),
  ]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Transformations />
      <QuoteSection data={quote} />
      <Testimonials data={testimonials} />
      <ServicesSection data={services} />
      <FAQSection />
      <Footer />
    </>
  );
}
