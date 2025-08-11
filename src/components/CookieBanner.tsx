
'use client'
import { useEffect, useState } from 'react'
import { getConsent, setConsent } from '@/src/lib/consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const c = getConsent()
    if (c == null || c.analytics === false) setVisible(true)
  }, [])
  if (!visible) return null
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-3xl rounded-lg bg-white shadow-lg ring-1 ring-gray-200 p-4 z-50">
      <p className="text-sm text-gray-700">
        We use cookies for essential site functions and, with your consent, analytics to improve the experience. Learn more in our Privacy Policy.
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => { setConsent({ analytics: false }); setVisible(false) }} className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200">Decline non‑essential</button>
        <button onClick={() => { setConsent({ analytics: true }); setVisible(false); location.reload() }} className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">Accept analytics</button>
      </div>
    </div>
  )
}
