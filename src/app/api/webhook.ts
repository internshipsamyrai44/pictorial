import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      console.log('Подписка оформлена:', event.data.object);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Ошибка вебхука:', err);
    return NextResponse.json({ error: 'Ошибка обработки вебхука' }, { status: 400 });
  }
}
