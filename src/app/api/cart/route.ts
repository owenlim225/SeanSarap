import { NextRequest, NextResponse } from "next/server";
import { getItemById } from "@/data/inventory";

const COOKIE_NAME = "foodsean_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

type CartLine = { itemId: string; quantity: number };

const store = new Map<string, CartLine[]>();

function getOrCreateSessionId(request: NextRequest): { sessionId: string; isNew: boolean } {
  const existing = request.cookies.get(COOKIE_NAME)?.value;
  if (existing && store.has(existing)) {
    return { sessionId: existing, isNew: false };
  }
  const sessionId = crypto.randomUUID();
  store.set(sessionId, []);
  return { sessionId, isNew: true };
}

function getSessionId(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value ?? null;
}

function buildCartResponse(sessionId: string, lines: CartLine[]) {
  const items = lines
    .filter((l) => l.quantity > 0)
    .map((line) => {
      const product = getItemById(line.itemId);
      return product
        ? {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: line.quantity,
            serving: product.serving,
          }
        : null;
    })
    .filter(Boolean) as { id: string; name: string; price: number; quantity: number; serving: string }[];

  return NextResponse.json({ items, sessionId });
}

function setSessionCookie(response: NextResponse, sessionId: string) {
  response.cookies.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function GET(request: NextRequest) {
  const sessionId = getSessionId(request);
  if (!sessionId || !store.has(sessionId)) {
    const { sessionId: newId } = getOrCreateSessionId(request);
    const res = buildCartResponse(newId, []);
    setSessionCookie(res, newId);
    return res;
  }
  const lines = store.get(sessionId) ?? [];
  return buildCartResponse(sessionId, lines);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, itemId, quantity } = body as {
    action: "add" | "update" | "remove";
    itemId?: string;
    quantity?: number;
  };

  if (!itemId && action !== "add") {
    return NextResponse.json({ error: "itemId required" }, { status: 400 });
  }

  const { sessionId, isNew } = getOrCreateSessionId(request);
  let lines = [...(store.get(sessionId) ?? [])];

  if (action === "add" && itemId != null) {
    const qty = Math.max(1, Math.floor(quantity ?? 1));
    const idx = lines.findIndex((l) => l.itemId === itemId);
    if (idx >= 0) lines[idx].quantity += qty;
    else lines.push({ itemId, quantity: qty });
  } else if (action === "update" && itemId != null && quantity !== undefined) {
    const qty = Math.max(0, Math.floor(quantity));
    const idx = lines.findIndex((l) => l.itemId === itemId);
    if (idx >= 0) {
      if (qty === 0) lines.splice(idx, 1);
      else lines[idx].quantity = qty;
    }
  } else if (action === "remove" && itemId != null) {
    lines = lines.filter((l) => l.itemId !== itemId);
  } else {
    return NextResponse.json({ error: "Invalid action or payload" }, { status: 400 });
  }

  store.set(sessionId, lines);
  const response = buildCartResponse(sessionId, lines);
  if (isNew) setSessionCookie(response, sessionId);
  return response;
}
