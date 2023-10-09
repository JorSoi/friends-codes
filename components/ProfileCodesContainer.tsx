'use client'

import styles from '@/styles/ProfileCodesContainer.module.scss'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import CodesList from './auth/CodesList';
import ShareProfile from './ShareProfile';
import { useEffect, useState } from 'react';

export default function ProfileCodesContainer({user} : {user : any}) {

    const [userCodes, setUserCodes] = useState<{}>();
    const [isShareOpen, setIsShareOpen] = useState<boolean>(false)

    const supabase = createClientComponentClient();



    useEffect(() => {

        const getUserCodes = async () => {
            const { data, error } = await supabase.from('user_codes').select(`*, companies(id, name, logo_url)`).order('id', { ascending: false })
            if(!error) {
                setUserCodes(data);
            }
        }
        
        getUserCodes();
    
    }, [])

    const closeShareModal = () => {
        setIsShareOpen(false)
    }
    

    return (
        <div className={styles.profileCodesContainer}>
            <div className={styles.overflowWrapper}>
                <h1>My referral codes</h1>
                <div>
                    <CodesList codes={userCodes}/>
                </div>
            </div>
                
            <button className={styles.shareButton} onClick={() => setIsShareOpen(true)}>
                Share my profile
            </button>
            {isShareOpen && <ShareProfile closeShareModal={closeShareModal} userData={user}/>}
        </div>
    );
}      