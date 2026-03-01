"use client";

import Image from "next/image";
import { useState } from "react";
import { createDataAttribute } from "next-sanity";
import type { TransformationItem } from "@/app/lib/sanity-data";

const FALLBACK_IMAGES = ["/images/m1.png", "/images/m3.png", "/images/m5.png"];

type Props = { data?: TransformationItem[] };

export default function Transformations({ data }: Props) {
  const items = data?.length
    ? data.filter((t) => t.transformationImage).map((t) => ({ ...t, fromSanity: true }))
    : FALLBACK_IMAGES.map((src, i) => ({
        _id: `fallback-${i}`,
        _type: undefined,
        title: "",
        transformationImage: src,
        stats: null,
        quote: null,
        description: null,
        resultsList: [] as string[],
        fromSanity: false,
      }));

  const [flippedId, setFlippedId] = useState<string | null>(null);

  return (
    <section className="bg-[#0a0a0a] px-16 pb-32 pt-24">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-500">
          RESULTS
        </p>
        <h2 className="font-display text-5xl font-bold text-white">
          Client Transformations
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isFlipped = flippedId === item._id;
          return (
            <div
              key={item._id}
              className="relative min-h-[500px] w-full cursor-pointer aspect-[3/4] [perspective:1000px]"
              style={{ minHeight: 0 }}
            >
              <div
                className="relative h-full w-full rounded-xl"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s ease",
                }}
                onClick={() => setFlippedId(isFlipped ? null : item._id)}
              >
                {/* Awers (front) – zdjęcie */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-xl [backface-visibility:hidden]"
                  style={{ transform: "rotateY(0deg)" }}
                  {...(item.fromSanity && item._id
                    ? {
                        "data-sanity": createDataAttribute({
                          id: item._id,
                          type: "transformation",
                          path: ["transformationImage"],
                        })(),
                      }
                    : {})}
                >
                  <Image
                    src={item.transformationImage!}
                    alt={item.title || "Transformation"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Rewers (back) – te same wymiary co awers, treść od góry do dołu */}
                <div
                  className="absolute inset-0 flex flex-col justify-start overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] [backface-visibility:hidden]"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 pt-10 sm:px-8">
                  {item.title && (
                    <h3
                      className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl"
                      {...(item.fromSanity && item._id
                        ? {
                            "data-sanity": createDataAttribute({
                              id: item._id,
                              type: "transformation",
                              path: ["title"],
                            })(),
                          }
                        : {})}
                    >
                      {item.title}
                    </h3>
                  )}
                  <div className="mt-4 flex flex-1 flex-col space-y-6">
                  {item.stats && (
                    <p
                      className="text-sm text-gray-400 sm:text-base"
                      {...(item.fromSanity && item._id
                        ? {
                            "data-sanity": createDataAttribute({
                              id: item._id,
                              type: "transformation",
                              path: ["stats"],
                            })(),
                          }
                        : {})}
                    >
                      {item.stats.split("•").map((s, i) => (
                        <span key={i}>
                          {i > 0 && (
                            <span className="mx-1.5 inline-block h-1 w-1 rounded-full bg-[#C0392B]" />
                          )}
                          {s.trim()}
                        </span>
                      ))}
                    </p>
                  )}
                  {item.quote && (
                    <div
                      className="flex gap-3"
                      {...(item.fromSanity && item._id
                        ? {
                            "data-sanity": createDataAttribute({
                              id: item._id,
                              type: "transformation",
                              path: ["quote"],
                            })(),
                          }
                        : {})}
                    >
                      <div className="w-1 shrink-0 rounded-full bg-[#C0392B]" />
                      <p className="text-xl italic leading-snug text-white">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  )}
                  {item.description && (
                    <p
                      className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 sm:text-base"
                      {...(item.fromSanity && item._id
                        ? {
                            "data-sanity": createDataAttribute({
                              id: item._id,
                              type: "transformation",
                              path: ["description"],
                            })(),
                          }
                        : {})}
                    >
                      {item.description}
                    </p>
                  )}
                  {item.resultsList?.length > 0 && (
                    <div
                      className="mt-auto rounded-lg border border-white/10 bg-white/[0.04] p-4"
                      {...(item.fromSanity && item._id
                        ? {
                            "data-sanity": createDataAttribute({
                              id: item._id,
                              type: "transformation",
                              path: ["resultsList"],
                            })(),
                          }
                        : {})}
                    >
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#C0392B] sm:text-sm">
                        Co otrzymał(a):
                      </p>
                      <ul className="space-y-3">
                        {item.resultsList.map((line, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-white sm:text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C0392B]" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </div>
                  {!item.title &&
                    !item.stats &&
                    !item.quote &&
                    !item.description &&
                    (!item.resultsList || item.resultsList.length === 0) && (
                      <p className="mt-4 text-gray-500 text-sm">
                        Brak treści. Dodaj dane w Sanity (Transformation).
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
