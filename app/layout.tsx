import NavBar from '@/components/NavBar'
import '@/styles/globals.scss'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'


const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata () {

  const supabase = createServerComponentClient({cookies});
  const {data: {user}, error} = await supabase.auth.getUser();
  if(user) {
    return {
      title: 'My FriendsCodes',
      description: 'Share and redeem referral codes all over the world',
    }
  } else {
    return {
      title: 'FriendsCodes',
      description: 'Share and redeem referral codes all over the world',
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
