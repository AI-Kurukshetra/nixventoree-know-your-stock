import { NextResponse } from "next/server";
import { purchaseOrders } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ data: purchaseOrders });
}
