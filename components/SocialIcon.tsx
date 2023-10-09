'use client'

import styles from '@/styles/components/SocialIcon.module.scss'
import Image from 'next/image';
import Link from 'next/link';

function SocialIcon({type} : {type : string}) {

    const user = 'jorsoi'
    const userURL = 'https://www.google.com'

    const shareLinks : any = {
        whatsapp: 'whatsapp://send?text=Take a look at my referral codes using this link: https://google.com',
        twitter: `https://twitter.com/share?text=Take a look at the referral codes from ${user}!&url=${userURL}&hashtags=referralcodes`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${userURL}&quote=Take a look at my referral codes using this link:`,
        telegram: `https://telegram.me/share/url?url=${userURL}&text=Take a look at the referral codes from ${user}!`,
        reddit: `https://reddit.com/submit?url=${userURL}&title=Check out my referral codes!`,
        
    }


    return (
        <Link className={styles.socialIcon} href={shareLinks[type]} target='_blank'>
            <Image src={`/social_icons/${type}-icon.svg`} width={30} height={30} alt='' />
        </Link>
    );
}

export default SocialIcon;