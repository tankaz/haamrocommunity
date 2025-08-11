
import { prisma } from '@/src/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const listingId = String(form.get('listingId') || '')
  const name = String(form.get('name') || 'Visitor')
  const email = String(form.get('email') || 'visitor@example.com')
  const message = String(form.get('message') || 'Interested in your services')
  if (!listingId) return NextResponse.json({ ok: false, error: 'listingId required' }, { status: 400 })
  const lead = await prisma.lead.create({ data: { listingId, name, email, message } })
  return NextResponse.json({ ok: true, lead })
}
