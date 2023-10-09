'use client'

import styles from '@/styles/components/CodeCard.module.scss'
import Image from 'next/image';
import CodeEditor from './CodeEditor';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function({code} : {code : any | void}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const supabase = createClientComponentClient();



    const openCodeEditor = () => {
        setIsOpen(true)
    }

    const closeCodeEditor : any= () => {
        setIsOpen(false)
    }

    

    const handleDelete : any = async (id : string) => {
        const {data, error} = await supabase.from('user_codes').delete().eq('id', `${id}`)
        if(!error) {
            setIsOpen(false)
        } else {
            console.log(error)
        }
    }

    return (
        <>
            <div className={styles.codeCard} onClick={openCodeEditor}>
                {code.companies.logo_url ? 
                <Image className={styles.storeLogo} src={code.companies.logo_url} width={100} height={100} alt='' />
                :                    
                <div className={styles.storeIcon}>
                    <Image src={'/store_icon.svg'} width={20} height={20} alt=''/>
                </div>
                }
                
                <p>{code.companies.name}</p>
            </div>
            {isOpen && <CodeEditor codeData={code} handleDelete={handleDelete} closeCodeEditor={closeCodeEditor}/>}
        </>


    );
}