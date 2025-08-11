
import { prisma } from '@/src/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const listingId = String(form.get('listingId') || '')
  if (!listingId) return NextResponse.json({ ok: false }, { status: 400 })
  await prisma.listing.update({ where: { id: listingId }, data: { status: 'PUBLISHED' } })
  return NextResponse.redirect(new URL('/dashboard/moderation', req.url))
}
