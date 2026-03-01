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
  const [testimonials, quote, services] = await Promise.all([
    getTestimonials(),
    getQuote(),
    getServices(),
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
