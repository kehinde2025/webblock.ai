import { NextResponse } from 'next/server'

const clip = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  // honeypot: bots fill this, humans never see it
  if (body.website) return NextResponse.json({ ok: true })

  const name = clip(body.name, 100)
  const email = clip(body.email, 200)
  const company = clip(body.company, 150)
  const service = clip(body.service, 100)
  const details = clip(body.details, 3000)
  const timeline = clip(body.timeline, 150)
  const budget = clip(body.budget, 100)

  if (!name || !details || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const text = [
    'NEW WEBBLOCK INQUIRY',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '-'}`,
    `Service: ${service || '-'}`,
    `Timeline: ${timeline || '-'}`,
    `Budget: ${budget || '-'}`,
    '',
    details,
  ].join('\n')

  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
    }
  )

    if (!res.ok) {
    console.error('Telegram error:', res.status, await res.text())
    return NextResponse.json({ error: 'Delivery failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
