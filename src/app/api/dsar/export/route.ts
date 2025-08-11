
import { prisma } from '@/src/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 })
  const user = await prisma.user.findUnique({ where: { email }, include: {
    profile: true,
    listings: { include: { reviews: true, coupons: true, leads: true, sponsored: true } },
    events: { include: { tickets: true, orders: true } },
    reviews: true,
    subscriptions: true,
  } })
  return NextResponse.json({ ok: true, user })
}
