import { NextResponse } from "next/server";
import { getProductsData } from "@/lib/repositories/ops";

export async function GET() {
  const data = await getProductsData();
  return NextResponse.json({ data });
}

export async function POST() {
  return NextResponse.json(
    { error: "Use the authenticated server action on /products/new for product creation." },
    { status: 405 }
  );
}