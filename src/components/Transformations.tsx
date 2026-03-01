"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const PAIRS: [string, string][] = [
  ["/images/m1.png", "/images/m2.png"],
  ["/images/m3.png", "/images/m4.png"],
  ["/images/m5.png", "/images/m6.png"],
];

export default function Transformations() {
  const totalCards = PAIRS.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepPx, setStepPx] = useState(0);
  const [maxIndex, setMaxIndex] = useState(totalCards - 1);

  const gap = 12; // gap-3 = 0.75rem

  const updateStep = () => {
    if (!trackRef.current || !containerRef.current) return;
    const firstCard = trackRef.current.querySelector("[data-card]");
    if (!firstCard) return;
    const cardWidth = (firstCard as HTMLElement).offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const visibleCards = Math.min(
      totalCards,
      Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap)))
    );
    setStepPx(cardWidth + gap);
    setMaxIndex(Math.max(0, totalCards - visibleCards));
  };

  useEffect(() => {
    updateStep();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateStep);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="bg-[#0a0a0a] px-16 pb-32 pt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-500">
            RESULTS
          </p>
          <h2 className="font-display text-5xl font-bold text-white">
            Client Transformations
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-crimson hover:text-crimson disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-crimson hover:text-crimson disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-width slider wrapper — same left padding as page (pl-16) */}
      <div
        ref={containerRef}
        className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden pl-16"
      >
        <motion.div
          ref={trackRef}
          className="flex gap-3"
          animate={{ x: -currentIndex * stepPx }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {PAIRS.map(([before, after], i) => (
            <div
              key={i}
              data-card
              className="flex h-[540px] w-full shrink-0 gap-3 md:w-[45vw]"
            >
              <div className="relative min-w-0 h-full flex-1 overflow-hidden rounded-xl">
                <Image
                  src={before}
                  alt="Before"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 22.5vw"
                />
              </div>
              <div className="relative min-w-0 h-full flex-1 overflow-hidden rounded-xl">
                <Image
                  src={after}
                  alt="After"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 22.5vw"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
