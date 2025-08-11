
import { prisma } from '@/src/lib/db'
import { format } from 'date-fns'

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { startsAt: 'asc' }, take: 30 })
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Events</h1>
      <ul className="space-y-3">
        {events.map(e => (
          <li key={e.id} className="rounded-lg bg-white p-4 shadow">
            <h2 className="text-lg font-medium">{e.title}</h2>
            <p className="text-sm text-gray-700">{e.description}</p>
            <div className="text-xs text-gray-500 mt-2">{format(e.startsAt, 'EEE, dd MMM yyyy p')} – {format(e.endsAt, 'p')} @ {e.location}</div>
            <form action="/api/checkout/ticket" method="post" className="mt-2">
              <input type="hidden" name="eventId" value={e.id} />
              <button className="rounded bg-green-600 px-3 py-1 text-white">Buy ticket</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
