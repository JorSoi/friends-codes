'use client'

import ProfileCodesContainer from "@/components/ProfileCodesContainer";
import styles from '@/styles/ProfileName.module.scss'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function generateMetaData ({params} : {params : any}) : Promise<Metadata> {
    return {
        title: `Referral Codes from ${params.profileName}`,
      }
}

function page({params : {profileName}} : {params: {profileName : string}}) {

    const [user, setUser] = useState({});

    const supabase = createClientComponentClient();

    const getUserData = async () => {
        const { data , error } = await supabase.from('profiles').select().eq('user_name', profileName).limit(1).single();
        if (!error) {
            console.log(data)
            setUser(data);
        }
    }

    

    useEffect(() => {
        getUserData();
    }, [])
    

    return (
        <div className={styles.profileNamePage}>
            <ProfileCodesContainer externalVisitor={true} user={user}/>
            <Link href={'/'}>Created with <span>ReferralCodes</span></Link>
        </div>
    );
}

export default page;