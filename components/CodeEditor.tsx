'use client'

import styles from '@/styles/components/CodeEditor.module.scss';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import StoreDropdown from './StoreDropdown';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

function CodeEditor({codeData, handleDelete, closeCodeEditor} : { codeData? : any, handleDelete? : any, closeCodeEditor? : any }) {

    const router = useRouter()
    const formRef = useRef<HTMLFormElement | null>(null);
    const supabase = createClientComponentClient();

    const [store, setStore] = useState<string>(codeData ? codeData.companies.name : '')
    const [code, setCode] = useState<string>(codeData ? codeData.referral_value : '')
    const [isStoreInputFocused, setIsStoreInputFocused] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [storeLogo, setStoreLogo] = useState<string | undefined>('/store_icon.svg')
    const [storeId, setStoreId] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleStoreChange = ({target} : {target : any}) => {
        setStore(target.value)
    }

    const handleCodeChange = ({target} : {target : any}) => {
        setCode(target.value)
    }

    const handleDeleteClick = () => {
        handleDelete(codeData.id)
        router.refresh()
    }

    const handleClose = () => {
        closeCodeEditor();
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        setIsLoading(true)
        if (!formRef.current) return; //ensures that formData only initializes, if formRef is populated with an actual HTMLFormElement

        const formData = new FormData(formRef.current);

        if (codeData) {
            //updating existing referral code in case codeData was passed to this component
            const {data, error} = await supabase.from('user_codes').update({referral_value: formData.get('referral_code')}).eq('id', codeData.id)
            if(!error) {
                console.log('updated successfully');
                setIsLoading(false)
                closeCodeEditor();
            } else {
                console.log(error);
            }
        } else {
            //create new referral code in case codeData was not passed to this component
            const { data: { user } } = await supabase.auth.getUser()
            if(user && storeId) {
                const {data, error} = await supabase.from('user_codes').insert({user_id: user.id, company_id: storeId, referral_value: formData.get('referral_code')});
                if(!error) {
                    setIsLoading(false);
                    closeCodeEditor();
                }
            } else if (user && !storeId) {
                //upon creating a new referral code, the user has chosen an unlisted company which must be created first.
                const {data, error} = await supabase.from('companies').insert({name: store}).select();
                if (!error) {
                    console.log(data)
                    const res = await supabase.from('user_codes').insert({user_id: user.id, company_id: data[0].id, referral_value: formData.get('referral_code')});

                    setIsLoading(false)
                    closeCodeEditor();
                }


            }

            
        }

    }

    const selectStore = (storeParam : any) => {
        //update UI states (states for new stores will be set to undefined and handled in the UI automatically)
        setStore(storeParam.name);
        setStoreLogo(storeParam.logo_url ? storeParam.logo_url : undefined)
        setStoreId(storeParam.id ? storeParam.id.toString() : undefined)

        setIsStoreInputFocused(false)
    }


    //disable cta button when not all input is filled out.
    useEffect(() => {
        if(store?.length > 0 && code?.length > 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
        
    }, [store, code])

    

    return (
        <div className={styles.codeEditor}>
            <form ref={formRef} autoComplete='off' className={styles.editorWrapper} onSubmit={handleSubmit}>
                { !codeData &&
                    <div className={styles.cardContainer}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.icon}>
                            <Image src={storeLogo ? storeLogo : '/store_icon.svg'} width={20} height={20} alt='' />
                        </div>
                        <div className={styles.content}>
                            <h2>{codeData ? 'Update' : 'Add'} Store</h2>
                            <p>Select the store for your referral code.</p>
                        </div>
                    </div>
                    <div className={styles.storeInputWrapper}>
                        <input 
                            name='store_name'
                            placeholder={store ? '' : 'e.g. Netflix, Spotify'} 
                            className={styles.storeInput} 
                            value={store} 
                            onChange={handleStoreChange} 
                            onFocus={() => setIsStoreInputFocused(true)} 
                        />
                        {isStoreInputFocused && <StoreDropdown searchValue={store} selectStore={selectStore}/>}
                    </div>
                    
                </div>
                }
                
                <div className={styles.cardContainer}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.icon}>
                            <Image className={styles.codeIcon} src={'/code_icon.svg'} width={20} height={20} alt='' />
                        </div>
                        <div className={styles.content}>
                            <h2>{codeData ? 'Update' : 'Insert'}  Referral Code/Link</h2>
                            <p>Type your referral link/code {codeData ? `for ${store}` : null} here.</p>
                        </div>
                    </div>
                    <input 
                        name='referral_code'
                        placeholder={code ? '' : 'e.g. https://share.amazon.com/jorsoi13'} 
                        className={styles.codeInput} 
                        value={code} 
                        onChange={handleCodeChange}
                    />
                </div>

                <div className={styles.buttonWrapper}>
                    {codeData && <button className={styles.deleteButton}>
                        <Image src={'/delete_icon.svg'} width={20} height={20} alt='' onClick={handleDeleteClick}/>
                        </button>}
                    <button 
                        type='submit' 
                        disabled={isDisabled} 
                        className={isDisabled ? `${styles.cta} ${styles.disabled}` : styles.cta} 
                        onClick={handleSubmit}>
                            {isLoading ? <Image priority={true} src={'/spinner_animation.gif'} width={17} height={17} alt='' /> : null}
                            {codeData ? 'Update referral code' : 'Add referral code'} 
                    </button>
                </div>

                <div className={styles.closeEditor} onClick={handleClose}>
                    <Image src={'/arrow_left.svg'} width={13} height={13} alt='' />
                    <p>Close Editor</p>
                </div>
                
            </form>
            
        </div>
    );
}

export default CodeEditor;