"use client";

import { motion } from "framer-motion";

const cards = [
  {
    number: "01",
    title: "Choose Your Program",
    description:
      "Browse through tailored fitness plans designed for your goals — whether it's weight loss, muscle gain, or overall wellness.",
  },
  {
    number: "02",
    title: "Start Your Training",
    description:
      "Get personalized workout routines, nutrition tips, and regular check-ins to keep you on track.",
  },
  {
    number: "03",
    title: "See the Results",
    description:
      "Track your progress, celebrate milestones, and enjoy a stronger, healthier you.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0a0a0a] px-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
          PROCESS
        </p>
        <h2 className="mt-2 font-display text-5xl font-bold leading-tight text-white">
          How it works
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <motion.article
            key={card.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            className="min-h-[340px] rounded-2xl border border-white/[0.08] bg-white/[0.04] p-10 transition-all duration-300 ease-out hover:border-[rgba(192,57,43,0.4)] hover:shadow-[0_0_30px_rgba(192,57,43,0.1)]"
          >
            <span className="mb-7 block font-mono text-sm text-gray-500">
              {card.number}
            </span>
            <h3 className="mb-5 font-display text-3xl md:text-[2.65rem] font-bold leading-tight text-white">
              {card.title}
            </h3>
            <p className="text-lg leading-relaxed text-gray-400">
              {card.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
