'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from '@/styles/MyCodesPage.module.scss'
import ProfileCodesContainer from "@/components/ProfileCodesContainer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";



function page() {
    const [user, setUser] = useState({})
    const supabase = createClientComponentClient();
    const router = useRouter()

    useEffect(() => {
        const getUserData = async () => {
            const {data : { user }, error} = await supabase.auth.getUser();
            if (!user) {
                router.push('/auth/signIn')
            } else {
                setUser(user)
            }
        }

        getUserData();
    }, [])




    return (
        <div className={styles.myCodesPage}>
            <NavBar />
            <ProfileCodesContainer user={user}/>
        </div>
    );
}

export default page;
