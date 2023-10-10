'use client'

import styles from '@/styles/components/CodeRedemption.module.scss'
import Image from 'next/image';
import { useState } from 'react';


function CodeRedemption({codeData, closeModal}: {codeData : any, closeModal : any}) {

    const [hasCopied, setHasCopied] = useState<boolean>(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(codeData.referral_value)
        setHasCopied(true)
    }

    const handleClose = () => {
        closeModal();
    }

    return (
        <div className={styles.codeRedemption}>
            <div className={styles.modal}>
                <div className={styles.storeWrapper}>
                    {codeData.companies.logo_url ? 
                    <Image className={styles.storeLogo} src={codeData.companies.logo_url} width={100} height={100} alt='' />
                    :                    
                    <div className={styles.storeIcon}>
                        <Image src={'/store_icon.svg'} width={20} height={20} alt=''/>
                    </div>
                    }
                    <p>{codeData.companies.name}</p>
                </div>
                <p className={styles.referralCode}>{codeData.referral_value}</p>
                <button onClick={copyToClipboard} onPointerDown={copyToClipboard}>{hasCopied ? 'Copied!' : 'Copy Referral Code/Link'}</button>
            </div>
            <div className={styles.closeModal} onClick={handleClose} >
                <Image src={'/arrow_left.svg'} width={13} height={13} alt='' />
                <p>Go back</p>
            </div>
        </div>
    );
}

export default CodeRedemption;