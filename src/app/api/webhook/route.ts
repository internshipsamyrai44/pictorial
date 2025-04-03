import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!sig) {
    return NextResponse.json({ error: 'Ошибка: stripe-signature отсутствует!' }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Платеж завершен!', session);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Ошибка обработки вебхука' }, { status: 400 });
  }
}
