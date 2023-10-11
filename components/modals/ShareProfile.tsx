'use client'

import styles from '@/styles/components/ShareProfile.module.scss'
import Image from 'next/image';
import SocialIcon from '../SocialIcon';
import { useState } from 'react';

function ShareProfile({closeShareModal, userData} : {closeShareModal : any, userData : any}) {

    const [hasCopied, setHasCopied] = useState<boolean>(false)
    const user = userData?.user_metadata?.user_name;
    const env = process.env.NODE_ENV;
    const userURL = `${env == 'development' ? 'localhost:3000' : 'https://Production URL'}/${user}`

    const handleClose = () => {
        closeShareModal();
    }

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(userURL)
        setHasCopied(true)
    }

    return (
        <div className={styles.shareProfile}>
            <div className={styles.modal}>
                <div className={styles.titleWrapper}>
                    <h2>Share your referral codes! 🌍 🎉</h2>
                    <p>Add your profile-link to your social bio to remind your friends of your referral codes!</p>
                </div>
                <p className={styles.label}>Share via</p>
                <div className={styles.socialWrapper}>
                    <SocialIcon type={'whatsapp'} userURL={userURL} user={user} />
                    <SocialIcon type={'twitter'} userURL={userURL} user={user} />
                    <SocialIcon type={'facebook'} userURL={userURL} user={user} />
                    <SocialIcon type={'reddit'} userURL={userURL} user={user} />
                    <SocialIcon type={'telegram'} userURL={userURL} user={user} />
                </div>
                <p className={styles.label}>Or copy link</p>
                <div className={styles.inputWrapper}>
                    <input readOnly type='text' value={userURL} />
                    <button onClick={copyToClipboard} onPointerDown={copyToClipboard}>{hasCopied ? 'Copied!' : 'Copy'}</button>
                </div>
            </div>
            <div className={styles.closeEditor} onClick={handleClose} >
                <Image src={'/arrow_left.svg'} width={13} height={13} alt='' />
                <p>Go back</p>
            </div>
        </div>
    );
}

export default ShareProfile;