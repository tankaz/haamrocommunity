
export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="mt-2 text-gray-700">A community hub where individuals and businesses can create profiles, publish listings, share events, and grow together.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <a href="/listings" className="rounded-lg bg-white p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Browse Listings</h2>
          <p className="text-gray-700">Find local services, shops and pros.</p>
        </a>
        <a href="/events" className="rounded-lg bg-white p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <p className="text-gray-700">See what’s happening around you.</p>
        </a>
        <a href="/dashboard/analytics" className="rounded-lg bg-white p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Business Analytics</h2>
          <p className="text-gray-700">Understand traffic, leads and sales.</p>
        </a>
      </section>
    </div>
  )
}
