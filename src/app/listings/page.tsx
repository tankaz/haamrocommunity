
import { prisma } from '@/src/lib/db'

export default async function ListingsPage() {
  const listings = await prisma.listing.findMany({ orderBy: { createdAt: 'desc' }, take: 30 })
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Latest Listings</h1>
      <ul className="grid gap-4 md:grid-cols-2">
        {listings.map(l => (
          <li key={l.id} className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-2">
              {l.isFeatured && <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800" aria-label="Featured">Sponsored</span>}
              <a href={`#/listings/${l.slug}`} className="text-lg font-medium hover:underline">{l.title}</a>
            </div>
            <p className="text-sm text-gray-700 mt-1">{l.summary}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{l.category}</span>
              <form action="/api/leads" method="post">
                <input type="hidden" name="listingId" value={l.id} />
                <button className="rounded bg-blue-600 px-2 py-1 text-white">Enquire</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
