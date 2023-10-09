import Image from "next/image";
import styles from '@/styles/components/DropdownItem.module.scss'

function DropdownItem({store, selectStore} : {store : any, selectStore : any}) {
    const handleClickTest = () => {
        selectStore(store)
    }

    return (
        <div key={`${store.id}`} className={styles.dropdownItem} onClick={handleClickTest}>
            {store.logo_url ? 
                <Image className={styles.storeLogo} src={store.logo_url} width={20} height={20} alt=""/>
                :
                <div className={styles.storeIcon}>
                    <Image src={'/store_icon.svg'} width={20} height={20} alt=''/>
                </div>
        }
            
            <p>{store.name}</p>
        </div>
    );
}

export default DropdownItem;