'use client'

import styles from '@/styles/components/NavBar.module.scss'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// export const dynamic = 'force-dynamic'

export default function NavBar () {

    const [user, setUser] = useState<boolean>(false);
    const router = useRouter();
    const pathName = usePathname();

    const supabase = createClientComponentClient();

    const handleSignOut = async () : Promise<void> => {
        const {error} = await supabase.auth.signOut();
        if(!error) {
            setUser(false);
            if (pathName == '/') {
                router.refresh();
            }
        }
        
    }
    
useEffect(() => {
    const getUserData = async () => {
        const { data : { user }, error } = await supabase.auth.getUser();
    if(user) {
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
                <Link href={'/'} className={styles.logo}>FriendsCodes</Link>
                {/* <div className={styles.linkWrapper}>
                    <Link href={'/community-codes'}>Community Codes</Link>
                    <Link href={'/my-codes'}>My Codes</Link>
                </div>            */}
                <div className={styles.authWrapper}>
                    {!user ?
                        <>
                            <Link className={styles.signIn} href={'/auth/signIn'}>Sign In</Link>
                            <Link className={styles.signUp} href={'/auth/signUp'}>Sign Up</Link>
                        </>
                        :
                        <Link className={styles.signOut} href={'/'} onClick={handleSignOut}>Sign Out</Link>
                    }    
                </div>                   
            </div>
        </nav>
    )
}