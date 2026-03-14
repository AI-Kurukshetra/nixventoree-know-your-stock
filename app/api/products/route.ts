import { NextResponse } from "next/server";
import { products } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ data: products });
}

export async function POST() {
  return NextResponse.json({ error: "Product creation is not wired yet." }, { status: 501 });
}
