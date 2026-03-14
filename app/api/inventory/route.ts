import { NextResponse } from "next/server";
import { lowStock, movements, products } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ balances: products, lowStock, movements });
}
