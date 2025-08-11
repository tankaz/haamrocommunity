
import { prisma } from '@/src/lib/db'

export default async function AnalyticsPage() {
  const [listings, events, leads, orders] = await Promise.all([
    prisma.listing.count(),
    prisma.event.count(),
    prisma.lead.count(),
    prisma.order.count(),
  ])
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics (overview)</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Card title="Listings" value={listings} />
        <Card title="Events" value={events} />
        <Card title="Leads" value={leads} />
        <Card title="Ticket Orders" value={orders} />
      </div>
      <p className="text-sm text-gray-600">Hook up GA4 for deeper funnel insights (page views, conversions) — loaded only when users accept analytics cookies.</p>
    </div>
  )
}

function Card({ title, value }: { title: string, value: number }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-3xl font-semibold">{value}</div>
    </div>
  )
}
