import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  items: z.array(
    z.object({
      quantity: z.number().int().positive(),
      book: z.object({ id: z.string(), price: z.number().positive() })
    })
  ),
  total: z.number().positive()
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid order payload" }, { status: 400 });
  }

  const itemCount = parsed.data.items.reduce((sum, item) => sum + item.quantity, 0);

  return NextResponse.json({
    orderId: `ORD-${Math.floor(Math.random() * 900000 + 100000)}`,
    total: parsed.data.total,
    itemCount,
    customerEmail: parsed.data.email,
    createdAt: new Date().toISOString()
  });
}
