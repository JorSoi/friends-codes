'use client'

import styles from '@/styles/Home.module.scss'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

export default function Home() {
const searchParams = useSearchParams();
let pageVisitor : any = searchParams.get('visitor')


  return (
    <main className={styles.main}>
      <div className={styles.heroWrapper}>
        <p className={styles.welcomeText}>Hey {pageVisitor ? pageVisitor : 'there stranger'}! 👋</p>
        <h1>Enter your referral codes, 
we help to get them redeemed!</h1>
        <p className={styles.subheading}>
        LogoIpsum is the simplest and fastest place to share and redeem referral codes with your friends and the world. Collect all the benefits from using or sharing codes from 4000+ companies worldwide.
        </p>

        <div className={styles.buttonWrapper}>
          <Link href={'/my-codes'} className={styles.profileCTA}>Add your first referral code</Link>
          <Link href={'/community-codes'} className={styles.communityCTA}>Find other referral codes</Link>
        </div>
      </div>
    </main>
  )
}
