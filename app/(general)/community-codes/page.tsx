import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


async function page() {

    cookies().getAll(); // Keep cookies in the JS execution context for Next.js build

    const supabase = createServerComponentClient({cookies});

    const {data, error} = await supabase.auth.getUser();

    return (
        <div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h1>Community Page</h1>
            {data.user ? `welcome back ${data.user.user_metadata.user_name}` : 'you are not signed in. Please sign up first to see content.'}
        </div>
    );
}

export default page;