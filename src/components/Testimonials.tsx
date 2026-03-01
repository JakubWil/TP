"use client";

import { useRef, useEffect, useState } from "react";
import type { TestimonialItem } from "@/app/lib/sanity-data";

const CARD_HEIGHT_PX = 260;
const CARD_GAP_PX = 20;
const VISIBLE_HEIGHT_PX = CARD_HEIGHT_PX * 2 + CARD_GAP_PX;

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  { text: "If you are looking for a personal trainer who can change your life, motivate you, and teach you how to eat properly — you are in the right place.", author: "Angelika Lenartowicz, Newcastle, UK", initials: "AL" },
  { text: "Just wanted to give a massive shoutout — honestly, he is the best trainer I have ever had!", author: "Hasan Miah, Newcastle, UK", initials: "HM" },
  { text: "A game changer in my fitness journey. Highly recommend.", author: "Sarah Thompson, London, UK", initials: "ST" },
];

function getTotalContentHeight(count: number) {
  return CARD_HEIGHT_PX * count + CARD_GAP_PX * (count - 1) + 24 + 256;
}

type Props = { data?: TestimonialItem[] };

export default function Testimonials({ data }: Props) {
  const testimonials = data?.length ? data : FALLBACK_TESTIMONIALS;
  const totalContentHeightPx = getTotalContentHeight(testimonials.length);

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [styles, setStyles] = useState<{ opacity: number; blur: number }[]>(
    testimonials.map((_, i) => (i === 0 ? { opacity: 1, blur: 0 } : { opacity: 0.35, blur: 8 }))
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const update = () => {
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;

      const next = testimonials.map((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return { opacity: 0.35, blur: 8 };
        const rect = el.getBoundingClientRect();
        const relTop = rect.top - containerTop;
        const cardHeight = rect.height;

        if (relTop + cardHeight < 0) return { opacity: 0, blur: 8 };
        if (relTop < 0) {
          const t = Math.max(0, 1 + relTop / cardHeight);
          return { opacity: t, blur: (1 - t) * 8 };
        }
        return { opacity: 0.35, blur: 8 };
      });

      let topIndex = -1;
      let bestTop = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relTop = rect.top - containerTop;
        if (relTop < bestTop && relTop > -rect.height * 0.45) {
          bestTop = relTop;
          topIndex = i;
        }
      });
      if (topIndex >= 0) next[topIndex] = { opacity: 1, blur: 0 };
      setStyles(next);
    };

    container.addEventListener("scroll", update);
    update();

    return () => container.removeEventListener("scroll", update);
  }, [testimonials.length]);

  return (
    <section className="relative flex min-h-[78vh] flex-none items-start overflow-hidden bg-[#0a0a0a]">
      <div className="flex w-1/2 flex-col items-start pt-8 pl-16">
        <p className="text-white text-[clamp(2.8rem,3.8vw,5rem)] font-bold leading-[1.4] m-0">
          Success stories
          <br />
          from clients who
          <br />
          trusted the
          <br />
          process and now
          <br />
          live the results.
        </p>
      </div>

      <div className="relative w-1/2 h-full flex flex-col min-h-0 overflow-hidden">
        <div
          ref={scrollRef}
          className="testimonials-scroll flex flex-col pr-16 overflow-x-hidden overflow-y-scroll"
          style={{
            paddingTop: "2rem",
            height: VISIBLE_HEIGHT_PX,
            maxHeight: "calc(100vh - 2rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={() => { document.body.style.overflow = "hidden"; }}
          onMouseLeave={() => { document.body.style.overflow = ""; }}
          onWheel={(e) => e.stopPropagation()}
        >
          <style>{`
            .testimonials-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          <div
            className="flex flex-col flex-shrink-0"
            style={{ minHeight: totalContentHeightPx, paddingBottom: "2rem" }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex-shrink-0 w-full overflow-hidden"
                style={{
                  minHeight: CARD_HEIGHT_PX,
                  height: CARD_HEIGHT_PX,
                  marginBottom: i < testimonials.length - 1 ? CARD_GAP_PX : 0,
                  paddingBottom: i === testimonials.length - 1 ? 24 : 0,
                  transition: "opacity 0.4s ease-out, filter 0.4s ease-out",
                  opacity: styles[i]?.opacity ?? (i === 0 ? 1 : 0.35),
                  filter: styles[i]?.blur !== undefined ? `blur(${styles[i].blur}px)` : (i === 0 ? "blur(0px)" : "blur(8px)"),
                }}
              >
                <p className="text-white text-lg leading-[1.7] max-w-[480px] mb-6">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#444] flex items-center justify-center text-white font-bold text-sm">
                    {t.initials}
                  </div>
                  <span className="text-[#999] text-sm">— {t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
