import ProfileCodesContainer from "@/components/ProfileCodesContainer";
import styles from '@/styles/ProfileName.module.scss'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export async function generateMetadata({ params : {profileName} } : {params : {profileName: any}}) {
    return {
        title: `Referral Codes from ${profileName}`,
        description: `Help ${profileName} to collect referral boni by redeeming his codes/links on his FriendsCodes profile`,
        openGraph: {
            title: `Referral Codes from ${profileName}`,
            description: `Help ${profileName} to collect referral boni by redeeming his codes or links on their FriendsCodes profile`,
            url: `https://friendscodes.de/${profileName}`,
            siteName: 'FriendsCodes',
            type: 'website',
          },
    }
  }


const profilePage = async ({params : {profileName}} : {params: {profileName : string}}) => {
    console.log(profileName)

    cookies().getAll();
    const supabase = createServerComponentClient({cookies});

        const { data , error } = await supabase.from('profiles').select().eq('user_name', profileName).limit(1).single();
    

    return (
        <div className={styles.profileNamePage}>
            <ProfileCodesContainer externalVisitor={true} user={data}/>
            <Link href={'/'}>Created with <span>FriendsCodes.de</span></Link>
        </div>
    );
}

export default profilePage;

        