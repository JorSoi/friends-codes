import NavBar from '@/components/NavBar'
import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Referral Codes',
  description: 'Share and redeem referral codes all over the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className={inter.className}>
        <NavBar />
        {children}
      </div>
  )
}
