import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { email, priceId } = await req.json();

    if (!email || !priceId) {
      return NextResponse.json({ error: 'email и priceId обязательны' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/settings?success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Ошибка создания сессии:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
