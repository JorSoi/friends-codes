import NavBar from '@/components/NavBar'
import '@/styles/globals.scss'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'


const inter = Inter({ subsets: ['latin'] })

export async function generateMetaData () {

  cookies().getAll();
  const supabase = createServerComponentClient({cookies});
  const {data, error} = await supabase.auth.getUser();
  if(data) {
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
      <div className={inter.className}>
        {children}
      </div>
  )
}
