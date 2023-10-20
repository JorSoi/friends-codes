'use client'

import styles from '@/styles/components/Toast.module.scss'
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Toast {
    type: "issue" | "warning" | "success";
    message: string;
}



function Toast({type, message} : Toast) {

    const [progress, setProgress] = useState<number>(0)
    const [bottom, setBotton] = useState<string>('-50px')
    const [opacity, setOpacity] = useState<string>('100%')
    const [display, setDisplay] = useState<string>('flex')

    const timelineStyles = {
        width: `${progress}%`,
        backgroundColor: type == 'issue' ? '#E7332A' : '#FF9700'
    }

    const toastStyles = {
        bottom: bottom,
        opacity: opacity,
        display: display
    }

    const closeToast = () => {
        setBotton("-50px"),
        setOpacity('0%')
        setTimeout(() => {
            setDisplay('none')
        }, 500)
    }


    useEffect(() => {
        setProgress(100);
        setBotton("4svh")
        setTimeout(() => {
            closeToast();
        }, 5000)
    }, [])

    return (
        <div className={`${styles.toast} ${styles[type]}`} style={toastStyles}>
                <Image src={`/toast_icons/${type}.svg`} width={20} height={20} alt={type} />
                <p>{message}</p>
                <div className={styles.timelineWrapper}>
                    <div className={`${styles.timeline}`} style={timelineStyles}></div>
                </div>
            
        </div>
    );
}

export default Toast;