import CodesList from "@/components/CodesList";
import ProfileCodesContainer from "@/components/ProfileCodesContainer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from '@/styles/ProfileName.module.scss'
import Link from "next/link";

async function page({params : {profileName}} : {params: {profileName : string}}) {

    let codes : any;

    const supabase = createServerComponentClient({cookies})

    const { data , error } = await supabase.from('profiles').select('id').eq('user_name', profileName).limit(1).single();
    let id = data?.id;
    if(!error) {
        const { data, error } = await supabase.from('user_codes').select(`*, companies(id, name, logo_url)`).eq('user_id', id).order('id', { ascending: false })
        if(!error) {
            codes = data;
        }
    }

    return (
        <div className={styles.profileNamePage}>
            <ProfileCodesContainer externalVisitor={true} user={profileName}/>
            <Link href={'/'}>Created with <span>LogoIpsum</span></Link>
        </div>
    );
}

export default page;