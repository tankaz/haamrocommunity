
'use client'
import { useState } from 'react'

export default function DashboardPage() {
  const [status, setStatus] = useState<string>('')

  async function createDemoData() {
    const res = await fetch('/api/dev/seed', { method: 'POST' })
    const json = await res.json()
    setStatus(JSON.stringify(json, null, 2))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex gap-2">
        <button onClick={createDemoData} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Create demo data</button>
        <a className="rounded bg-gray-800 px-4 py-2 text-white" href="/dashboard/analytics">Analytics</a>
        <a className="rounded bg-gray-800 px-4 py-2 text-white" href="/dashboard/moderation">Moderation</a>
      </div>
      {status && <pre className="bg-gray-900 text-green-300 p-4 text-xs overflow-auto rounded">{status}</pre>}
    </div>
  )
}
