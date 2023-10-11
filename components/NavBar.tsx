'use client'

import styles from '@/styles/components/NavBar.module.scss'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// export const dynamic = 'force-dynamic'

export default function NavBar () {

    const [user, setUser] = useState<boolean>(false);

    const supabase = createClientComponentClient();
    
useEffect(() => {
    const getUserData = async () => {
        const { data : { user }, error } = await supabase.auth.getUser();
    if(user) {
        console.log(user)
        setUser(true)
    } else {
        console.log('no user')
    }
    }
    getUserData();
}, [])

    
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