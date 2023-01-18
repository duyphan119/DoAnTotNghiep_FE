import { SubmitHandler, useForm } from "react-hook-form";
import { login, LoginDTO } from "../../../apis/auth";
import { useAuthContext } from "../../../context/AuthContext";
import { MSG_SUCCESS } from "../../../utils/constants";
import InputControl from "../../InputControl";
import styles from "../style.module.css";
type Props = Partial<{
  onClose: any;
}>;

const Login = ({ onClose }: Props) => {
  const { login: _login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>();
  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const res = await login(data);
      const { message, data: _data } = res;
      if (message === MSG_SUCCESS) {
        _login(_data.user, _data.accessToken);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
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
