// ============================================
// STEP 1: src/app/api/orders/route.ts
// ============================================
import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    if (!body.customerDetails || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    // Create order in Convex
    const result = await convex.mutation(api.orders.createOrder, {
      customerDetails: body.customerDetails,
      shippingAddress: body.shippingAddress,
      items: body.items,
      paymentMethod: body.paymentMethod,
      totals: body.totals,
    });

    return NextResponse.json({ orderId: result.orderId }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
