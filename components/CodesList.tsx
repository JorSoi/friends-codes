'use client'

import styles from '@/styles/components/CodesList.module.scss'
import CodeCard from './CodeCard';
import CodeEditor from './modals/CodeEditor';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function({codes, externalVisitor} : {codes : any, externalVisitor?: boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();


    const openCodeEditor = () => {
        setIsOpen(true)
    }
 
    const closeModal : any= () => {
        setIsOpen(false);
        router.refresh();
    }

    return (
        <div className={styles.codesList}>
            {codes?.map((code : any)=> {
                return(
                    <Suspense key={`${code.id}`} fallback={<p>loading</p>}>
                        <CodeCard key={`${code.id}`} code={code} externalVisitor={externalVisitor} />
                    </Suspense>
                ) 
            })}
            {!externalVisitor && <div className={styles.addCode} onClick={openCodeEditor}>
                <button className={styles.addButton}>
                    <Image src={'/add_icon.svg'} width={20} height={20} alt='' />
                </button> 
            </div>
            }
            {isOpen && !externalVisitor && <CodeEditor closeModal={closeModal}/>}
        </div>
    );
}