'use client'

import styles from '@/styles/components/StoreDropown.module.scss'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DropdownList from './DropDownList';

function StoreDropdown({searchValue, selectStore} : {searchValue : string, selectStore : any}) {

    const [storeList, setStoreList] = useState<any>();
    const [storeNameMatch, setStoreNameMatch] = useState(false)

    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getStores () {
            const {data, error} = await supabase.from('companies').select('*').ilike('name', !searchValue ? '*' : `%${searchValue}%`)
            
            if (!error) {
                setStoreList(data)
                // Check if store input matches any specific company name. If so, it will remove the "customStore"-dropdown item.
                data.forEach((store) => {
                    if (searchValue.toLowerCase() == store.name.toLowerCase()) {
                        setStoreNameMatch(true) //will show "customStore" dropdown item.
                    } else {
                        setStoreNameMatch(false) //will hide "customStore" dropdown item.
                    }
                })
                
            }
        }
        getStores();
       
    }, [searchValue])

    const handleClick = () => {
        selectStore({id: undefined, name: searchValue, logo_url: undefined})
    }
    
    return (
        <div className={styles.storeDropdown}>
            {searchValue && !storeNameMatch && 
                <div className={styles.customStore} onClick={handleClick}>
                    <div className={styles.storeIcon}>
                        <Image src={'/store_icon.svg'} width={20} height={20} alt=''/>
                    </div>
                    <p>Use: {searchValue}</p>
                </div>
            }


            <DropdownList storeList={storeList} selectStore={selectStore}/>
        </div>
    );
}

export default StoreDropdown;