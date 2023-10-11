'use client'

import styles from '@/styles/components/CodeCard.module.scss'
import Image from 'next/image';
import CodeEditor from './modals/CodeEditor';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import CodeRedemption from './modals/CodeRedemption';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function({code, externalVisitor} : {code : any | void, externalVisitor? : boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const supabase = createClientComponentClient();
    const router = useRouter();



    const openCodeEditor = () => {
        setIsOpen(true)
    }

    const closeModal : any= () => {
        setIsOpen(false)
    }

    

    const handleDelete : any = async (id : string) => {
        const {data, error} = await supabase.from('user_codes').delete().eq('id', `${id}`)
        if(!error) {
            setIsOpen(false)
            router.refresh();
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
            {isOpen && !externalVisitor && <CodeEditor codeData={code} handleDelete={handleDelete} closeModal={closeModal}/>}
            {isOpen && externalVisitor && <CodeRedemption codeData={code} closeModal={closeModal}/>}
        </>


    );
}