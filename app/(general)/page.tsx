'use client'

import styles from '@/styles/Home.module.scss'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Home() {

  const searchParams = useSearchParams();
  const [pageVisitor, setPageVisitor] = useState<string | null>()
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser () : Promise<void> {
      const {data : {user}, error} = await supabase.auth.getUser();
      if(!error) {
        setPageVisitor(user?.user_metadata.user_name);
        console.log(user)
      } else {
        setPageVisitor(searchParams.get('visitor'))
      }
    }

    getUser();
  })


  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.heroWrapper}>
        <p className={styles.welcomeText}>Hey {pageVisitor ? pageVisitor : 'there stranger'}! 👋</p>
        <h1>Enter your referral codes, 
we help to get them redeemed!</h1>
        <p className={styles.subheading}>
        LogoIpsum is the simplest and fastest place to share and redeem referral codes with your friends and the world. Collect all the benefits from using or sharing codes from many companies worldwide.
        </p>

        <div className={styles.buttonWrapper}>
          <Link href={'/my-codes'} className={styles.profileCTA}>Add your first referral code</Link>
          <Link href={'/community-codes'} className={styles.communityCTA}>Find other referral codes</Link>
        </div>
      </div>
    </main>
  )
}
