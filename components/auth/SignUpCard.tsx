'use client'

import styles from '@/styles/components/SignUpCard.module.scss'
import { useFormik } from "formik";
import Link from 'next/link';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

function SignUpCard() {

    const router = useRouter();
    const supabase = createClientComponentClient();


    const handleGoogleSignIn = () => {
        alert('Google Sign Up')
    }

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
        }, 
        onSubmit: async () => {
            const {data, error} = await supabase.auth.signUp({
                email: formik.values.email,
                password: formik.values.password,
                options: {
                    data: {
                        user_name: formik.values.userName,
                        avatar_url: 'this is a test message'
                    },
                    emailRedirectTo: `${location.origin}/auth/callback`
                },
            })

            if(!error) {
                router.push('/my-codes');
            } else {
                alert(error)
            }
        },
    })

    return (
        <div className={styles.signUpCard}>
                <Link className={styles.logo} href={'/'}>LogoIpsum</Link>
                <h1>Hi 👋, let’s get started.</h1>
                <p className={styles.subtitle}>Find and share your first referral codes. We make sure that they find the right person to redeem them!</p>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <input type="text" name="userName" onChange={formik.handleChange} value={formik.values.userName} placeholder='User Name*' minLength={3} required/>
                <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder='Email*'  required/>
                <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder='Password*' required minLength={6}/>
                <button type="submit">Sign Up</button>
            </form>
            <div className={styles.separator}>
                <div className={styles.line}></div>
                <p>or</p>
                <div className={styles.line}></div>
            </div>
            <button className={styles.googleButton} onClick={handleGoogleSignIn} type='button'>
            <Image src='https://authjs.dev/img/providers/google.svg' width={20} height={20} alt=''/>
                Sign Up with Google
            </button>
            <Link className={styles.changeAuth} href={'/auth/signIn'}>I have an account</Link>
        </div> 
    );
}

export default SignUpCard;