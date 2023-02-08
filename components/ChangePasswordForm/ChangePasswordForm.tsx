import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangePassword } from "../../apis/auth";
import { authActions } from "../../redux/slice/authSlice";
import { useAppDispatch } from "../../redux/store";
import InputControl from "../InputControl";
import styles from "./_style.module.scss";

type Props = {};

type ChangePasswordInputs = ChangePassword & {
  reTypePassword: string;
};

const ChangePasswordForm = (props: Props) => {
  const appDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInputs>();
  const password = useRef({});
  password.current = watch("newPassword", "");
  const onSubmit: SubmitHandler<ChangePasswordInputs> = (data) => {
    appDispatch(
      authActions.fetchChangePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
    );
  };
  return (
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
            value === password.current || "Nhập lại mật khẩu không chính xác",
        })}
      />
      <div>
        <button type="submit" className={styles.btn}>
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
