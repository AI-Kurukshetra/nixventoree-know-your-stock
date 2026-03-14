import { NextResponse } from "next/server";
import { orders } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ data: orders });
}

export async function POST() {
  return NextResponse.json({ error: "Order creation is not wired yet." }, { status: 501 });
}
