import { NextResponse } from "next/server";
import { getOrdersData } from "@/lib/repositories/ops";

export async function GET() {
  const data = await getOrdersData();

  return NextResponse.json({ data });
}

export async function POST() {
  return NextResponse.json({ error: "Order creation is not wired yet." }, { status: 501 });
}