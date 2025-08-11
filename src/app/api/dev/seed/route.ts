
import { prisma } from '@/src/lib/db'
import { NextResponse } from 'next/server'

export async function POST() {
  const owner = await prisma.user.upsert({
    where: { email: 'demo@portal.local' },
    update: {},
    create: { email: 'demo@portal.local', name: 'Demo Owner' }
  })
  const listing = await prisma.listing.upsert({
    where: { slug: 'demo-coffee-shop' },
    update: {},
    create: {
      ownerId: owner.id,
      title: 'Demo Coffee Shop',
      slug: 'demo-coffee-shop',
      summary: 'Independent coffee shop serving the community',
      content: 'We roast our own beans and host weekly events.',
      category: 'Food & Drink',
      status: 'PUBLISHED'
    }
  })
  const event = await prisma.event.create({
    data: {
      hostId: owner.id,
      title: 'Community Latte Art Workshop',
      description: 'Learn latte art basics with our head barista.',
      startsAt: new Date(Date.now() + 7*24*3600*1000),
      endsAt: new Date(Date.now() + 7*24*3600*1000 + 2*3600*1000),
      location: '123 High Street, London'
    }
  })
  const coupon = await prisma.coupon.create({
    data: {
      listingId: listing.id,
      code: 'WELCOME10',
      title: '10% off cappuccino',
      description: 'Valid this month only',
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 30*24*3600*1000)
    }
  })
  return NextResponse.json({ ok: true, owner, listing, event, coupon })
}
