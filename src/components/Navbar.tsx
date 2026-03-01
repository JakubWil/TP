"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#1on1", label: "1:1 Coaching" },
  { href: "#online", label: "Online Coaching" },
  { href: "#plans", label: "Custom Plans" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent"
    >
      <nav className="flex h-20 w-full items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="font-display text-2xl font-bold text-crimson">
          PT
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white transition-colors hover:underline"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/contact"
            className="rounded-full border-2 border-white bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
          >
            Get in Touch
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
