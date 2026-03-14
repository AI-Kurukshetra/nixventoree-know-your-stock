import { NextResponse } from "next/server";
import { kpis, lowStock, reportCards } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ kpis, lowStock, cards: reportCards });
}
