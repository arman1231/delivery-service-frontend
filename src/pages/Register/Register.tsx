import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchRegister } from '../../services/auth/slice';
import AuthService from '../../utils/api/authApi';
import styles from './Register.module.css'

const Register = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        // dispatch(fetchRegister({name, email, password}));
        // testRequest()
        test2()
    }


    const test2 = () => {
        return axios.post('http://localhost:8081/auth/sign-up', { email, name, password }).then(res => console.log(res)
        )
    }
    const testRequest = () => {
        return fetch(`http://localhost:8081/auth/sign-up`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            method: "POST",
            body: JSON.stringify({
                "email": "arm333@ya.ru",
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

export default Register;
