"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { QuoteData } from "@/app/lib/sanity-data";

const FALLBACK_LINES = [
  "I work with real people who want real",
  "results, through structured coaching,",
  "mindset shifts, and proven training",
  "systems.",
];

type Props = { data?: QuoteData };

export default function QuoteSection({ data }: Props) {
  const lines = data?.lines?.length ? data.lines : FALLBACK_LINES;
  const buttonText = data?.buttonText ?? "Start Your Journey";
  const buttonHref = data?.buttonHref ?? "#start";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [buttonUnlocked, setButtonUnlocked] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || collapsed) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const total = wrapperRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
      if (p >= 0.25) {
        setButtonUnlocked(true);
        setCollapsed(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [collapsed]);

  const bp = buttonUnlocked ? 1 : Math.max(0, (progress - 0.05) / 0.2);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: collapsed ? "100vh" : "150vh",
        transition: "height 0.4s ease-out",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(120,20,20,0.45) 0%, #0a0a0a 55%)",
          overflow: "hidden",
        }}
      >
        {/* Text */}
        <div style={{ textAlign: "center", maxWidth: "85vw" }} className="px-4">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              style={{
                display: "block",
                fontSize: "clamp(3rem, 4.2vw, 5.2rem)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.35,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {line}
            </motion.span>
          ))}
        </div>

        {/* Button - reveals in second half of scroll */}
        <div
          style={{
            marginTop: "3rem",
            opacity: bp,
            transform: `scale(${0.6 + bp * 0.4}) translateY(${(1 - bp) * 30}px)`,
            filter: `blur(${(1 - bp) * 8}px)`,
          }}
        >
          <a
            href={buttonHref}
            style={{
              display: "inline-block",
              background: "#C0392B",
              color: "white",
              borderRadius: "999px",
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
