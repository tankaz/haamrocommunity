
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const form = await req.formData()
  const eventId = String(form.get('eventId') || '')
  if (!eventId) return NextResponse.json({ ok: false, error: 'eventId required' }, { status: 400 })
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    // Demo fallback when Stripe is not configured
    return NextResponse.json({ ok: true, demo: true, message: 'Stripe not configured. Set STRIPE_SECRET_KEY to enable checkout.' })
  }
  const stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  // For demo use a predefined price; in production create a Product/Price per ticket type
  const price = process.env.STRIPE_PRICE_PRO_MONTHLY
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: price || 'price_xxx', quantity: 1 }],
    success_url: process.env.NEXTAUTH_URL + '/events?success=1',
    cancel_url: process.env.NEXTAUTH_URL + '/events?cancel=1',
  })
  return NextResponse.json({ ok: true, url: session.url })
}
