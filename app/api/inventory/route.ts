import { NextResponse } from "next/server";
import { getMovementsData, getProductsData } from "@/lib/repositories/ops";

export async function GET() {
  const [balances, movements] = await Promise.all([getProductsData(), getMovementsData()]);
  const lowStock = balances.filter((item) => item.available <= item.reorderPoint);

  return NextResponse.json({ balances, lowStock, movements });
}