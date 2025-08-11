
'use client'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getConsent } from '@/src/lib/consent'

export default function Analytics() {
  const [ok, setOk] = useState(false)
  const id = process.env.NEXT_PUBLIC_GA_ID
  useEffect(() => {
    const c = getConsent()
    setOk(!!c?.analytics && !!id)
  }, [id])
  if (!ok) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
          gtag('config', '${id}', { 'anonymize_ip': true });
        `}
      </Script>
    </>
  )
}
