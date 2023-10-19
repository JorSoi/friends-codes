'use client'

import styles from '@/styles/components/ProfileCodesContainer.module.scss'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import CodesList from './CodesList';
import ShareProfile from './modals/ShareProfile';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic'

export default function ProfileCodesContainer({user, externalVisitor} : {user : any, externalVisitor? : boolean}) {

    const [isOpen, setIsOpen] = useState<boolean>(false)


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
                        <h1>{user?.user_name}'s referral codes 🎁 🎉</h1>
                        <p>Redeem referral codes below so that you and jorsoi can both collect store benefits.</p>
                    </div>
             
                }
                <div>
                    <CodesList externalVisitor={externalVisitor} user={user} />
                </div>
            </div>
                
            {!externalVisitor && <button className={styles.shareButton} onClick={() => setIsOpen(true)}>
                Share my profile
            </button>}
            {isOpen && <ShareProfile closeShareModal={closeShareModal} user={user}/>}
        </div>
    );
}      