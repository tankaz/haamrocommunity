
import { prisma } from '@/src/lib/db'

export default async function ModerationPage() {
  const pending = await prisma.listing.findMany({ where: { status: 'PENDING' } })
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Moderation queue</h1>
      {pending.length === 0 ? <p className="text-gray-600">No items pending.</p> : (
        <ul className="space-y-2">
          {pending.map(p => (
            <li key={p.id} className="rounded bg-white p-4 shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-600">{p.category}</div>
              </div>
              <div className="flex gap-2">
                <form action="/api/moderation/approve" method="post">
                  <input type="hidden" name="listingId" value={p.id} />
                  <button className="rounded bg-green-600 px-3 py-1 text-white">Approve</button>
                </form>
                <form action="/api/moderation/reject" method="post">
                  <input type="hidden" name="listingId" value={p.id} />
                  <button className="rounded bg-red-600 px-3 py-1 text-white">Reject</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
