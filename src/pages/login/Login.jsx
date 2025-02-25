import React, { useState } from "react";

import styles from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import H2 from "../../components/h2/H2";
import { useAuth } from "../../hooks/useAuth";

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { handleLogin } = useAuth();

  const validateData = (e) => {
    e.preventDefault();
    handleLogin(name, password);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={validateData} className={styles.form}>
        <H2>Увійти</H2>

        <Input
          name="name"
          autoComplete="name"
          type="text"
          label="Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          name="password"
          autoComplete="current-password"
          type="password"
          label="Пароль"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className={styles.button}>
          Підтвердити
        </Button>
      </form>
    </div>
  );
};

export default Login;
