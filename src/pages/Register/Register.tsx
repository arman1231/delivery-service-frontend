import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchRegister } from "../../services/auth/slice";
import styles from "./Register.module.css";

const Register = () => {
  const isAuth = useSelector((state: any) => state.auth.user);
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

  if (isAuth) {
    alert("Registered successfully!");
    return <Navigate to="/" />;
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
