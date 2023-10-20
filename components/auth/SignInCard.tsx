'use client'

import styles from '@/styles/components/SignInCard.module.scss'
import { useFormik } from "formik";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation' 
import Toast from '../Toast';

function SignInCard() {

    const [isAuthed, setIsAuthed] = useState(false)
    const [issue, setIssue] = useState(false)

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        isAuthed ? router.push('/dashboard') : null;
    }, [])



    const handleGoogleSignIn = () => {
        alert('Google Sign in')
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, 
        onSubmit: async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formik.values.email,
                password: formik.values.password,
              })
              if(!error) {
                router.push('/my-codes')
              } else {
                setIssue((prev) => {
                    return !prev
                })
              }
              
        },
    })

    return (
        <div className={styles.signInCard}>
                <Link className={styles.logo} href={'/'}>LogoIpsum</Link>
                <h1>Welcome back 👋</h1>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder='Email*' autoComplete='off'required/>
                <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder='Password*'required/>
                <button type="submit">Sign In</button>
            </form>
            {/* <div className={styles.separator}>
                <div className={styles.line}></div>
                <p>or</p>
                <div className={styles.line}></div>
            </div>
            <button className={styles.googleButton} onClick={handleGoogleSignIn} type='button'>
            <Image src='https://authjs.dev/img/providers/google.svg' width={20} height={20} alt=''/>
                Sign In with Google
            </button> */}
            <Link className={styles.changeAuth} href={'/auth/signUp'}>I don’t have an account yet</Link>
            {issue && <Toast type='issue' message='Login was unsuccessfull' />}
        </div> 
    );
}

export default SignInCard;