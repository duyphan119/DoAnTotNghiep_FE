import { SubmitHandler, useForm } from "react-hook-form";
import { LoginDTO } from "../../../apis/auth";
import { authActions } from "../../../redux/slice/authSlice";
import { useAppDispatch } from "../../../redux/store";
import { InputControl } from "../../common";
import styles from "../_style.module.scss";
type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>();
  const appDispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    appDispatch(authActions.fetchLogin(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputControl
        label="Email"
        error={errors.email}
        register={register("email", {
          required: {
            value: true,
            message: "Email không được để trống",
          },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Email không hợp lệ",
          },
        })}
      />
      <InputControl
        type="password"
        label="Mật khẩu"
        error={errors.password}
        register={register("password", {
          required: {
            value: true,
            message: "Mật khẩu không được để trống",
          },
          minLength: {
            value: 6,
            message: "Mật khẩu ít nhất 6 kí tự",
          },
        })}
      />
      <button className={styles.btn} type="submit">
        Đăng nhập
      </button>
    </form>
  );
};

export default Login;
