import { NextResponse } from "next/server";
import { getPurchaseOrdersData } from "@/lib/repositories/ops";

export async function GET() {
  const data = await getPurchaseOrdersData();

  return NextResponse.json({ data });
}