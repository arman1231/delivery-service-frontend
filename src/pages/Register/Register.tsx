import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchRegister } from "../../services/auth/slice";
import styles from "./Register.module.css";

const Register = () => {
  const registerStatus = useSelector((state: any) => state.auth.registerStatus);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(fetchRegister({ name, email, password }));
    setEmail("");
    setName("");
    setPassword("");
  };

  if (registerStatus === 'loading') {
    return <>
      <p>Form is being submited...</p>
    </>
    // return <Navigate to="/sign-in" />;
  }

  if (registerStatus === 'succeeded') {
    return <Navigate to="/sign-in" />;
  }
  

  return (
    <section className={styles.register}>
      <h1 className={`${styles.heading}`}>Registration</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
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
        Already have an account?{" "}
        <Link to="/sign-in" className={styles.link}>
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default Register;
