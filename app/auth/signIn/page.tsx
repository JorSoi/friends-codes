import SignInCard from "@/components/auth/SignInCard";
import styles from '@/styles/SignIn.module.scss'

function SignIn() {
  return (
    <div className={styles.signIn}>
      <SignInCard />
    </div>
  );
}

export default SignIn;