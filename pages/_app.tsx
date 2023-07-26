import type { AppProps } from 'next/app'
import '@/app/globals.css'

import "gestalt/dist/gestalt.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}