
import { prisma } from '@/src/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const listingId = String(form.get('listingId') || '')
  const location = String(form.get('location') || 'home:hero')
  const days = Number(form.get('days') || 7)
  if (!listingId) return NextResponse.json({ ok: false, error: 'listingId required' }, { status: 400 })
  const now = new Date()
  const sp = await prisma.sponsoredPlacement.create({ data: { listingId, location, startsAt: now, endsAt: new Date(now.getTime()+ days*24*3600*1000) } })
  await prisma.listing.update({ where: { id: listingId }, data: { isFeatured: true } })
  return NextResponse.json({ ok: true, placement: sp })
}
