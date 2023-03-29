import { useState } from 'react';
import { Link } from 'react-router-dom'
import AuthService from '../../utils/api/authApi';
import styles from './Register.module.css'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent): React.FormEventHandler<HTMLFormElement> | void => {
        e.preventDefault();
        console.log('hi');
        // register(name, email, password)
        testRequest()
    }

    const testRequest = () => {
        return fetch(`http://localhost:8081/auth/sign-up`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            method: "POST",
            body: JSON.stringify({
                "email": "arm2@ya.ru",
                "name": "Arm",
                "password": "1234567890"
            }),
            // credentials: 'include',
        }).then(res => {
            console.log(res);
            
            if (res.ok) {
                return res.json();
            }
        }).then(data => console.log(data)
        )
    }
    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await AuthService.register(name, email, password);
            localStorage.setItem('token', res.data.token);
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={styles.register}>
            <h1 className={`${styles.heading}`}>
                Registration
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
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