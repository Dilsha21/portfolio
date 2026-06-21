import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/auth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorized();
  const { data, error } = await supabase.from("content").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Upsert one or many content keys
export async function PUT(request: NextRequest) {
  if (!isAdminAuthenticated(request)) return unauthorized();
  const body = await request.json(); // { key, value } or [{ key, value }, ...]
  const rows = Array.isArray(body) ? body : [body];
  const updates = rows.map((r) => ({ ...r, updated_at: new Date().toISOString() }));
  const { error } = await supabase.from("content").upsert(updates, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
