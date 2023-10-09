import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from '@/styles/MyCodesPage.module.scss'
import ProfileCodesContainer from "@/components/ProfileCodesContainer";


async function page() {


    const supabase = createServerComponentClient({cookies});

    const {data : { user }, error} = await supabase.auth.getUser();

    return (
        <div className={styles.myCodesPage}>
            <ProfileCodesContainer user={user}/>
        </div>
    );
}

export default page;
