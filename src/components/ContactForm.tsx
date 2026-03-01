"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: replace with your backend or form service (e.g. Formspree, API route)
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setSubmitting(false);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
        <p className="font-display text-2xl font-bold text-white">
          Thank you for your message
        </p>
        <p className="mt-3 text-gray-400">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-400"
        >
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-400"
        >
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B]"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-gray-400"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B]"
          placeholder="+44 ..."
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-400"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B]"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#C0392B] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#a93226] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
