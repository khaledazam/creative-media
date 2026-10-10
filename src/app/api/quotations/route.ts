import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, discount = 0, taxRate = 0.14 } = body; // 14% VAT in Egypt typically

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Items array is required' }, { status: 400 });
    }

    let subtotal = 0;
    const calculatedItems = items.map((item: any) => {
      const itemTotal = (item.quantity * item.unitPrice) - (item.discount || 0);
      subtotal += itemTotal;
      return {
        ...item,
        total: itemTotal,
      };
    });

    const totalAfterDiscount = subtotal - discount;
    const tax = totalAfterDiscount * taxRate;
    const grandTotal = totalAfterDiscount + tax;

    // In a real scenario, this would be saved to the database via Supabase here.
    
    return NextResponse.json({
      success: true,
      data: {
        items: calculatedItems,
        subtotal,
        discount,
        tax,
        grandTotal,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
