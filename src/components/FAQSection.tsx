"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Animatable gradient fill for "spreading" red effect */
const faqSpreadStyles = `
  @property --faq-fill {
    syntax: "<percentage>";
    initial-value: 0%;
    inherits: true;
  }
  .faq-row {
    --faq-fill: 0%;
    border-color: rgba(255, 255, 255, 0.1);
    transition: --faq-fill 1.1s cubic-bezier(0.25, 0.1, 0.25, 1), border-color 1s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .faq-row:hover {
    --faq-fill: 100%;
    border-color: #C0392B;
  }
  .faq-row.faq-open {
    --faq-fill: 100%;
    border-color: #C0392B;
  }
  .faq-question-fill {
    background: linear-gradient(90deg, #C0392B 0%, #C0392B var(--faq-fill), #fff var(--faq-fill), #fff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: none;
  }
  .faq-question-fill.faq-open {
    color: #C0392B;
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
  }
  .faq-icon { color: rgb(156, 163, 175); transition: color 1s ease-out; }
  .faq-row:hover .faq-icon { color: #C0392B; }
  .faq-icon.faq-open { color: #C0392B; }
`;

const faqs = [
  {
    id: 1,
    question: "How do I get started with coaching?",
    answer:
      "Get in touch via the contact form or email. We'll arrange a short call to discuss your goals, experience, and which programme (1:1, Online, or Custom Plan) fits you best. From there we'll set your start date and first steps.",
  },
  {
    id: 2,
    question: "What's the difference between 1:1 and Online Coaching?",
    answer:
      "1:1 Coaching means in-person sessions at the gym with hands-on technique correction and real-time feedback. Online Coaching is fully remote: you get a tailored programme, train where you like, and we stay in touch via weekly check-ins and messaging. Both include personalised programming and support.",
  },
  {
    id: 3,
    question: "Do I need a gym membership?",
    answer:
      "For 1:1 Coaching, yes — we train at NRG GYM Newcastle. For Online Coaching and Custom Plans, it depends on your programme: some can be done at home with minimal equipment, others are designed for a gym. We'll match the plan to what you have access to.",
  },
  {
    id: 4,
    question: "How often will I train?",
    answer:
      "That depends on your goals, schedule, and programme. Most clients train 3–4 times per week. We'll agree a realistic frequency in your initial consultation and adjust as needed.",
  },
  {
    id: 5,
    question: "Is nutrition included?",
    answer:
      "Yes. All coaching options include guidance on nutrition that supports your goals — from simple habits and portion awareness to more structured meal planning, depending on what you need.",
  },
  {
    id: 6,
    question: "Can I switch or pause my programme?",
    answer:
      "Life happens. We can adjust your programme, switch between 1:1 and Online, or pause and resume when you're ready. Just say what you need and we'll find a solution that works.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(faqs[0].id);

  return (
    <section className="bg-[#0a0a0a] px-6 py-24 md:px-12 lg:px-24">
      <style dangerouslySetInnerHTML={{ __html: faqSpreadStyles }} />
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
            Support
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            FAQ
          </h2>
        </motion.div>

        <div className="border-t border-white/[0.08]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={"faq-row group border-b " + (isOpen ? "faq-open" : "")}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={`faq-question-fill font-display text-lg font-semibold md:text-xl ${
                      isOpen ? "faq-open" : ""
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 transition-all duration-700 ease-out"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={isOpen ? "faq-icon faq-open" : "faq-icon"}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
