import Head from "next/head";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  changePassword as apiChangePassword,
  ChangePassword,
} from "../../apis/auth";
import { InputControl } from "../../components";
import { AccountLayout } from "../../layouts";
import { authSelector } from "../../redux/slice/authSlice";
import styles from "../../styles/Profile.module.css";
import { MSG_SUCCESS } from "../../utils/constants";

type Props = {};

type ChangePasswordInputs = ChangePassword & {
  reTypePassword: string;
};

const ChangePassword = (props: Props) => {
  const { profile } = useSelector(authSelector);
  // const { show } = useSnackbarContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInputs>();
  const password = useRef({});
  password.current = watch("newPassword", "");
  const onSubmit: SubmitHandler<ChangePasswordInputs> = async (data) => {
    try {
      const res = await apiChangePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      const { message, data: _data } = res;
      if (message === MSG_SUCCESS) {
        //show("Đổi mật khẩu thành công", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return profile ? (
    <AccountLayout titleHeading="Đổi mật khẩu">
      <>
        <Head>
          <title>Đổi mật khẩu</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputControl
            type="password"
            label="Mật khẩu hiện tại"
            error={errors.oldPassword}
            register={register("oldPassword", {
              required: {
                value: true,
                message: "Mật khẩu hiện tại không được bỏ trống",
              },
            })}
          />
          <InputControl
            type="password"
            label="Mật khẩu mới"
            error={errors.newPassword}
            register={register("newPassword", {
              required: {
                value: true,
                message: "Mật khẩu mới không được bỏ trống",
              },
              minLength: {
                value: 6,
                message: "Mật khẩu mới ít nhất 6 kí tự",
              },
            })}
          />
          <InputControl
            type="password"
            label="Mật khẩu mới"
            error={errors.reTypePassword}
            register={register("reTypePassword", {
              validate: (value) =>
                value === password.current ||
                "Nhập lại mật khẩu không chính xác",
            })}
          />
          <div>
            <button type="submit" className={styles.btn}>
              Cập nhật
            </button>
          </div>
        </form>
      </>
    </AccountLayout>
  ) : null;
};

export default ChangePassword;
