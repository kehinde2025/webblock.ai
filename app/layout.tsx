import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Webblock — Software Development & Automation',
  description: 'Webblock builds web applications, mobile products, backend systems, integrations, and automation for businesses and digital teams.',
  openGraph: { title: 'Webblock — Build. Automate. Scale.', description: 'Full-stack development and automation for serious software.', type: 'website' },
}
export const viewport: Viewport = { themeColor: '#f6f6f4', colorScheme: 'light', width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
