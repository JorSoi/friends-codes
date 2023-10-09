import styles from '@/styles/ProfileCodesContainer.module.scss'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import CodesList from './auth/CodesList';
import { cookies } from 'next/headers';
import ShareProfile from './ShareProfile';

export default async function ProfileCodesContainer({user} : {user : any}) {

    const supabase = createServerComponentClient({cookies});
    const { data, error } = await supabase.from('user_codes').select(`*, companies(id, name, logo_url)`).order('id', { ascending: false })

    return (
        <div className={styles.profileCodesContainer}>
            <div className={styles.overflowWrapper}>
                <h1>My referral codes</h1>
                <div>
                    <CodesList codes={data}/>
                </div>
            </div>
                
            <button className={styles.shareButton}>
                Share my profile
            </button>
            {true && <ShareProfile />}
        </div>
    );
}      