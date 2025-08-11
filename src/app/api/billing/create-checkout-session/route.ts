
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ ok: false, error: 'Stripe not configured' }, { status: 400 })
  const stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  const price = process.env.STRIPE_PRICE_PRO_MONTHLY
  if (!price) return NextResponse.json({ ok: false, error: 'Define STRIPE_PRICE_PRO_MONTHLY' }, { status: 400 })
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price, quantity: 1 }],
    success_url: process.env.NEXTAUTH_URL + '/dashboard?subscribed=1',
    cancel_url: process.env.NEXTAUTH_URL + '/dashboard?canceled=1',
  })
  return NextResponse.json({ ok: true, url: session.url })
}
