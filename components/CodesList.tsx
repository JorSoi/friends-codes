'use client'

import styles from '@/styles/components/CodesList.module.scss'
import CodeCard from './CodeCard';
import CodeEditor from './modals/CodeEditor';
import Image from 'next/image';
import { Suspense, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function({externalVisitor} : {externalVisitor?: boolean}) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userCodes, setUserCodes] = useState<{}[] | null>([]);
    const supabase = createClientComponentClient();

    const getUserCodes = async () => {
        const { data, error } = await supabase.from('user_codes').select(`*, companies(id, name, logo_url)`).order('id', { ascending: false })
        if(!error) {
            setUserCodes(data);
        }
    }

    const openCodeEditor = () => {
        setIsOpen(true)
    }
 
    const closeModal = () : any => {
        setIsOpen(false);
    }

    const refreshUserCodes = () : any => {
        getUserCodes();        
    }

    useEffect(() => {
        getUserCodes();
    }, [])

    return (
        <div className={styles.codesList}>
            {userCodes?.map((code : any)=> {
                return(
                    <Suspense key={`${code.id}`} fallback={<p>loading</p>}>
                        <CodeCard key={`${code.id}`} code={code} externalVisitor={externalVisitor} refreshUserCodes={refreshUserCodes} />
                    </Suspense>
                ) 
            })}
            {!externalVisitor && <div className={styles.addCode} onClick={openCodeEditor}>
                <button className={styles.addButton}>
                    <Image src={'/add_icon.svg'} width={20} height={20} alt='' />
                </button> 
            </div>
            }
            {isOpen && !externalVisitor && <CodeEditor refreshUserCodes={refreshUserCodes} closeModal={closeModal}/>}
        </div>
    );
}