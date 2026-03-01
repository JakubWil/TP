"use client";

import { VisualEditing } from "next-sanity";

export function VisualEditingWrapper({ isDraft }: { isDraft: boolean }) {
  if (!isDraft) return null;
  return <VisualEditing />;
}
