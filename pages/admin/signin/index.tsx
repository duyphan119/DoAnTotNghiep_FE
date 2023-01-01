import Head from "next/head";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, LoginDTO } from "../../../apis/auth";
import { useAuthContext } from "../../../context/AuthContext";
import { DefaultLayout } from "../../../layouts";
import { MSG_SUCCESS } from "../../../utils/constants";
import styles from "../../../styles/AdminAuth.module.css";
import { useRouter } from "next/router";
type Props = {};

const Login = (props: Props) => {
  const { login: _login } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginDTO>();
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const { message, data: _data } = await login(data);
      if (message === MSG_SUCCESS) {
        _login(_data.user, _data.accessToken);
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <>
        <Head>
          <title>Đăng nhập</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>{" "}
        <main className={styles.wrapper}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1>Đăng nhập</h1>
            <div className="form-group">
              <input
                type="text"
                id="email"
                className="form-control"
                autoComplete="off"
                {...register("email")}
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className="form-control"
                autoComplete="off"
                {...register("password")}
              />
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
            </div>
            <button className={styles.btn} type="submit">
              Đăng nhập
            </button>
          </form>
        </main>
      </>
    </div>
  );
};

export default Login;
