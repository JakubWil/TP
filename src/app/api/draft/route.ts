import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET ?? process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET ?? "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const redirectTo = searchParams.get("redirect") || "/";

  const isValid =
    (PREVIEW_SECRET && secret === PREVIEW_SECRET) ||
    (process.env.NODE_ENV === "development" && !PREVIEW_SECRET);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid or missing secret" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
