import NavBar from '@/components/NavBar'
import '@/styles/globals.scss'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'


const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata () {
  cookies().getAll();
  
  const supabase = createServerComponentClient({cookies});
  const {data: {user}, error} = await supabase.auth.getUser();
  if(user) {
    return {
      title: 'My FriendsCodes',
      description: 'FriendsCodes is the simplest and fastest place to share and redeem referral codes with your friends and family. Simply add codes and links to your profile and collect store-benefits from hundreds of companies worldwide!',
      openGraph: {
        title: `FriendsCodes`,
        description: 'FriendsCodes is the simplest and fastest place to share and redeem referral codes with your friends and family. Simply add codes and links to your profile and collect store-benefits from hundreds of companies worldwide!',
        url: `https://friendscodes.de`,
        siteName: 'FriendsCodes',
        type: 'website',
      },
    }
  } else {
    return {
      title: 'FriendsCodes',
      description: 'Share and redeem referral codes all over the world',
      openGraph: {
        title: `FriendsCodes`,
        description: 'FriendsCodes is the simplest and fastest place to share and redeem referral codes with your friends and family. Simply add codes and links to your profile and collect store-benefits from hundreds of companies worldwide!',
        url: `https://friendscodes.de`,
        siteName: 'FriendsCodes',
        type: 'website',
      },
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
