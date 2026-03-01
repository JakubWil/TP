"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-dark md:block">
      {/* Photo — mobile: full width 50vh first; desktop: absolute right 60% */}
      <div className="relative h-[50vh] w-full shrink-0 overflow-hidden md:absolute md:right-0 md:top-0 md:h-full md:w-[60%]">
        <div
          className="absolute inset-y-0 left-0 z-10 w-[35%] bg-gradient-to-r from-[#0a0a0a] to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent"
          aria-hidden
        />
        <Image
          src="/images/trainer.jpg"
          alt="Personal trainer — professional fitness coaching"
          fill
          className="object-cover object-[center_top]"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>

      {/* Content — mobile: below photo, centered; desktop: absolute left 50% */}
      <div className="relative z-20 flex flex-1 flex-col justify-center px-6 py-16 text-center md:absolute md:left-0 md:top-0 md:h-full md:w-[50%] md:flex-none md:items-start md:pl-16 md:text-left">
        <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white md:text-[clamp(3rem,4.5vw,5.5rem)]">
          <motion.span
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="block"
          >
            THE REAL SYSTEM —
          </motion.span>
          <motion.span
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="block"
          >
            BUILT FOR REAL RESULTS
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-[420px] text-lg text-gray-300"
        >
          More than a fitness plan. This is a complete coaching experience
          designed to transform your body and mindset.
        </motion.p>
        <motion.a
          href="#start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mt-8 inline-block rounded-full bg-crimson px-8 py-4 font-semibold text-white transition-all hover:brightness-110 hover:scale-105 md:mx-0"
        >
          Start Your Journey
        </motion.a>
      </div>
    </section>
  );
}
