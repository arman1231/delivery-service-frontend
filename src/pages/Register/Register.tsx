import { Link } from 'react-router-dom'
import styles from './Register.module.css'

const Register = () => {
    return (
        <section className={styles.register}>
            <h1 className={`${styles.heading}`}>
                Registration
            </h1>
            <form className={styles.form}>
                <input type='text' placeholder='Name' className={styles.input} />
                <input type='email' placeholder='Email' className={styles.input} />
                <input type='password' placeholder='Password' className={styles.input} />
                <input type='submit' value='Submit' className={styles.submitButton} />
            </form>
            <p className={styles.underForm}>
                Already have an account? {" "}
                <Link to="/sign-in" className={styles.link}>
                    Sign in
                </Link>
            </p>
        </section>

    )
}

export default Register