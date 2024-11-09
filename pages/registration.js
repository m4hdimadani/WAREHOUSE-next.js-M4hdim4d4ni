import { useState } from "react";

import { useRegister } from "../services/mutations";

import styles from "../styles/RegistrationPage.module.css";
import Link from "next/link";


function RegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate } = useRegister();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const registerHandler = (event) => {
    event.preventDefault();

    const { username, password, confirmPassword } = form;

    if (!username || !password)
      return alert("User Name and Password is Necessary");
    if (password !== confirmPassword) return alert("Passwords Isn't The Same!");

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          alert(data.data.message);
        },
        onError: (error) => alert(error.response.data.message),
      }
    );
  };

  return (
    <div className={styles.box}>
      <img src="../assets/Union.png" />
      <p>فرم ثبت نام</p>
      <form onSubmit={registerHandler} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={form.username}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={form.password}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="تکرار رمز عبور"
          value={form.confirmPassword}
          onChange={changeHandler}
        />
        <Link href={"/login"}>
        <button type="submit">ثبت نام</button>
        </Link>
      </form>
    </div>
  );
}

export default RegistrationPage;
