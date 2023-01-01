import { SubmitHandler, useForm } from "react-hook-form";
import { login, LoginDTO } from "../../../apis/auth";
import { useAuthContext } from "../../../context/AuthContext";
import { MSG_SUCCESS } from "../../../utils/constants";
import styles from "../style.module.css";
type Props = {
  onClose?: any;
};

const Login = (props: Props) => {
  const { login: _login } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginDTO>();
  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const res = await login(data);
      const { message, data: _data } = res;
      if (message === MSG_SUCCESS) {
        _login(_data.user, _data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        {errors.email && errors.email.type === "required" && (
          <div className="form-error">Email không được để trống</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div className="form-error">Email không hợp lệ</div>
        )}
        <input
          type="text"
          id="email"
          className="form-control"
          autoComplete="off"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />
        <label htmlFor="email" className="form-label required">
          Email
        </label>
      </div>
      <div className="form-group">
        {errors.password && errors.password.type === "required" && (
          <div className="form-error">Mật khẩu không được để trống</div>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <div className="form-error">Mật khẩu ít nhất 6 kí tự</div>
        )}
        <input
          type="password"
          id="password"
          className="form-control"
          autoComplete="off"
          {...register("password", { required: true, minLength: 6 })}
        />
        <label htmlFor="password" className="form-label required">
          Mật khẩu
        </label>
      </div>
      <button className={styles.btn} type="submit">
        Đăng nhập
      </button>
    </form>
  );
};

export default Login;
