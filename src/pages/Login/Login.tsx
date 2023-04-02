import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchLogin } from "../../services/auth/slice";
import styles from "./Login.module.css";

const Login = () => {
  const isAuth = useSelector((state: any) => state.auth.user);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
    setEmail("");
    setPassword("");
  };

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className={styles.register}>
      <h1 className={`${styles.heading}`}>Sign in</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input type="submit" value="Submit" className={styles.submitButton} />
      </form>
      <p className={styles.underForm}>
      Don’t have an account?{" "}
        <Link to="/sign-up" className={styles.link}>
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default Login