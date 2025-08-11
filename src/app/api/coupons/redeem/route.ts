
import { prisma } from '@/src/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const code = String(form.get('code') || '')
  if (!code) return NextResponse.json({ ok: false, error: 'code required' }, { status: 400 })
  const c = await prisma.coupon.update({ where: { code }, data: { redemptions: { increment: 1 } } })
  return NextResponse.json({ ok: true, coupon: c })
}
