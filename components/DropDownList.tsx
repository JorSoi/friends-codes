import styles from '@/styles/components/DropdownList.module.scss'
import DropdownItem from "./DropdownItem";

function DropdownList({storeList, selectStore} : {storeList : any, selectStore : any}) {



    return (
        <div className={styles.dropdownList}>
            {
                storeList?.map((store : any) => {
                    return (
                        <DropdownItem key={`${store.id}`} store={store} selectStore={selectStore}/>
                    )
                })
            }
        </div>
    );
}

export default DropdownList;