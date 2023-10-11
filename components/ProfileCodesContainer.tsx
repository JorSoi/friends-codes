'use client'

import styles from '@/styles/components/ProfileCodesContainer.module.scss'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import CodesList from './CodesList';
import ShareProfile from './modals/ShareProfile';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic'

export default function ProfileCodesContainer({user, externalVisitor} : {user : any, externalVisitor? : boolean}) {

    const [userCodes, setUserCodes] = useState<{}>();
    const [isOpen, setIsOpen] = useState<boolean>(false)

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
        setIsOpen(false)
    }
    

    return (
        <div className={styles.profileCodesContainer}>
            <div className={styles.overflowWrapper}>
                {!externalVisitor ?
                    <h1>My referral codes</h1>
                :
                    <div className={styles.externalVisitorTitle}>
                        <h1>{user}'s referral codes 🎁 🎉</h1>
                        <p>Redeem referral codes below so that you and jorsoi can both collect store benefits.</p>
                    </div>
             
                }
                <div>
                    <CodesList codes={userCodes} externalVisitor={externalVisitor} />
                </div>
            </div>
                
            {!externalVisitor && <button className={styles.shareButton} onClick={() => setIsOpen(true)}>
                Share my profile
            </button>}
            {isOpen && <ShareProfile closeShareModal={closeShareModal} userData={user}/>}
        </div>
    );
}      