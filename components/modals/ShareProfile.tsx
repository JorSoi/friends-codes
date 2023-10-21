'use client'

import styles from '@/styles/components/ShareProfile.module.scss'
import Image from 'next/image';
import SocialIcon from '../SocialIcon';
import { useState } from 'react';

function ShareProfile({closeShareModal, user} : {closeShareModal : any, user : any}) {

    const [hasCopied, setHasCopied] = useState<boolean>(false)
    const env = process.env.NODE_ENV;
    const userURL = `${env == 'development' ? 'localhost:3000' : 'https://www.friendscodes.de'}/${user.user_name}`

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
                    <p>Add your profile-link to your social bios to remind your friends of your referral codes!</p>
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