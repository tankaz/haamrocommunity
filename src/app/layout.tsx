
import './globals.css'
import { ReactNode } from 'react'
import CookieBanner from '@/src/components/CookieBanner'
import Analytics from '@/src/components/Analytics'

export const metadata = {
  title: 'Community Portal',
  description: 'Connect community members and local businesses',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Analytics />
        <CookieBanner />
        <div className="mx-auto max-w-6xl p-4">
          <header className="flex items-center justify-between py-4">
            <a href="/" className="text-xl font-semibold">Community Portal</a>
            <nav className="space-x-4">
              <a href="/listings" className="hover:underline">Listings</a>
              <a href="/events" className="hover:underline">Events</a>
              <a href="/dashboard" className="hover:underline">Dashboard</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-12 border-t py-6 text-sm text-gray-500">© {new Date().getFullYear()} Community Portal</footer>
        </div>
      </body>
    </html>
  )
}
