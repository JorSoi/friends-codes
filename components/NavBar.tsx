import styles from '@/styles/NavBar.module.scss'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export const dynamic = 'force-dynamic'

export default async function NavBar () {

    const supabase = createServerComponentClient({cookies})

    const { data : { user }, error } = await supabase.auth.getUser();



    return (
        <nav className={styles.nav}>
            <div className={styles.navWrapper}>
                <Link href={'/'} className={styles.logo}>LogoIpsum</Link>
                <div className={styles.linkWrapper}>
                    <Link href={'/community-codes'}>Community Codes</Link>
                    <Link href={'/my-codes'}>My Codes</Link>
                </div>           
                <div className={styles.authWrapper}>
                    {!user ?
                        <>
                            <Link className={styles.signIn} href={'/auth/signIn'}>Sign In</Link>
                            <Link className={styles.signUp} href={'/auth/signUp'}>Sign Up</Link>
                        </>
                        :
                        <Link className={styles.signOut} href={'/auth/signOut'}>Sign Out</Link>
                    }
                   
                </div>                   
                


            </div>
        </nav>
    )
}