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
        <h1>Share your referral codes to get them redeemed by friends and family!</h1>
        <p className={styles.subheading}>
        ReferralCodes is the simplest and fastest place to share and redeem referral codes with your friends. Simply add codes and links to your profile and link it in any of your social-media bios.
        </p>

        <div className={styles.buttonWrapper}>
          <Link href={'/my-codes'} className={styles.profileCTA}>Add your first referral code</Link>
          {/* <Link href={'/community-codes'} className={styles.communityCTA}>Find other referral codes</Link> */}
        </div>
      </div>
    </main>
  )
}
