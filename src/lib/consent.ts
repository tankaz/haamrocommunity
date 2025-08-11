
export function getConsent() {
  if (typeof window === 'undefined') return { analytics: false }
  try {
    const raw = window.localStorage.getItem('consent')
    if (!raw) return { analytics: false }
    return JSON.parse(raw)
  } catch {
    return { analytics: false }
  }
}
export function setConsent(consent: { analytics: boolean }) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem('consent', JSON.stringify(consent))
}
