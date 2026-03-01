"use client";

import Link from "next/link";

const contact = {
  phone: "+44 7428 799790",
  email: "Info.eahfit@gmail.com",
};

const address = {
  label: "ADDRESS",
  lines: [
    "NRG GYM Newcastle",
    "Unit 1-2 Newcastle Shopping Park",
    "Newcastle upon Tyne, UK",
  ],
};

const social = {
  label: "SOCIAL",
  links: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "WhatsApp", href: "https://wa.me/447428799790" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* CTA + Contact */}
      <section
        id="contact"
        className="scroll-mt-24 px-6 py-16 md:px-16 md:py-20"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Let&apos;s Work Together
            </h2>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
            >
              Get in touch
            </Link>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              Say hello
            </p>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-lg text-white transition-colors hover:text-gray-300"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block text-lg text-white transition-colors hover:text-gray-300"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="border-t border-gray-800" />

      {/* Footer info */}
      <section className="px-6 py-10 md:px-16 md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              {address.label}
            </p>
            <address className="mt-3 not-italic text-gray-300">
              {address.lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < address.lines.length - 1 && <br />}
                </span>
              ))}
            </address>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              {social.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-6 md:justify-end">
              {social.links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
