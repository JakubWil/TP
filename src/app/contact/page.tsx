import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              Contact
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 text-gray-400">
              Fill in the form below and we&apos;ll get back to you as soon as we can.
            </p>
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
