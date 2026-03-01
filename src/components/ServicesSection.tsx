"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ServiceItem } from "@/app/lib/sanity-data";

const FALLBACK_SERVICES: Array<{ id: string; title: string; description: string; features: string[]; image: string }> = [
  { id: "1-1", title: "1:1 Coaching", description: "Train in person for fully tailored sessions built around your goals.", features: ["Personalised, in-person training", "Real-time form correction"], image: "/1-1.png" },
  { id: "online", title: "Online Coaching", description: "Train from anywhere through Online Coaching.", features: ["Fully online coaching", "Weekly check-ins"], image: "/online.png" },
  { id: "custom", title: "Custom Plans", description: "One-time personalised training plan for your goals and lifestyle.", features: ["Custom program", "No ongoing commitment"], image: "/custom.png" },
];

function getImageUrl(service: ServiceItem): string {
  if (service.imageUrl) return service.imageUrl;
  const fallback: Record<string, string> = { "1-1": "/1-1.png", online: "/online.png", custom: "/custom.png" };
  return fallback[service.slug] ?? "/1-1.png";
}

function ServiceCardImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <>
      {!error && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {(!loaded || error) && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.02]" />
      )}
    </>
  );
}

type Props = { data?: ServiceItem[] };

export default function ServicesSection({ data }: Props) {
  const services = data?.length
    ? data.map((s) => ({
        id: s.slug,
        title: s.title,
        description: s.description,
        features: s.features ?? [],
        image: getImageUrl(s),
      }))
    : FALLBACK_SERVICES;

  return (
    <section id="services" className="bg-[#0a0a0a] px-6 pt-6 pb-24 md:px-16 md:pt-8 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 md:mb-8"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
          Offer
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
          Services
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.id}
            id={service.id === "1-1" ? "1on1" : service.id === "custom" ? "plans" : service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
              ease: "easeOut",
            }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] transition-all duration-300 ease-out hover:border-[rgba(192,57,43,0.35)] hover:shadow-[0_0_30px_rgba(192,57,43,0.08)] scroll-mt-24"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.06]">
              <ServiceCardImage src={service.image} alt={service.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                {service.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400 md:text-base">
                {service.description}
              </p>
              <ul className="mb-6 space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300 md:text-base"
                  >
                    <span className="mt-0.5 shrink-0 text-[rgba(192,57,43,0.9)]">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="inline-flex w-fit items-center justify-center rounded-lg bg-[rgba(192,57,43,0.9)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[rgba(192,57,43,1)]"
              >
                Find out more
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
