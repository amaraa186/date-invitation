import './globals.css'
import type { Metadata } from 'next'
import "gestalt/dist/gestalt.css";

export const metadata: Metadata = {
  title: 'Date invitation',
  description: 'Amundaga Birthday',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
