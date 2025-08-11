
import { prisma } from '@/src/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 })
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ ok: true, deleted: 0 })
  // Cascade delete related content in a simple order
  await prisma.review.deleteMany({ where: { authorId: user.id } })
  await prisma.lead.deleteMany({ where: { fromUserId: user.id } })
  await prisma.coupon.deleteMany({ where: { listing: { ownerId: user.id } } })
  await prisma.sponsoredPlacement.deleteMany({ where: { listing: { ownerId: user.id } } })
  await prisma.listing.deleteMany({ where: { ownerId: user.id } })
  await prisma.event.deleteMany({ where: { hostId: user.id } })
  await prisma.subscription.deleteMany({ where: { userId: user.id } })
  await prisma.profile.deleteMany({ where: { userId: user.id } })
  await prisma.session.deleteMany({ where: { userId: user.id } })
  await prisma.account.deleteMany({ where: { userId: user.id } })
  await prisma.user.delete({ where: { id: user.id } })
  return NextResponse.json({ ok: true, deleted: 1 })
}
