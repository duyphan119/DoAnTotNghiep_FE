import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterDTO } from "../../../types/dtos";
import { authActions } from "../../../redux/slice/authSlice";
import { useAppDispatch } from "../../../redux/store";
import { InputControl } from "../../common";
import styles from "../_style.module.scss";
type Props = Partial<{
  onClose: any;
}>;

const Register = ({ onClose }: Props) => {
  const appDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>();
  const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
    appDispatch(authActions.fetchRegister(data));
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputControl
        error={errors.fullName}
        label="Họ tên"
        register={register("fullName", {
          required: {
            value: true,
            message: "Họ tên không được để trống",
          },
        })}
      />
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
      <InputControl
        label="Số điện thoại"
        error={errors.phone}
        register={register("phone", {
          required: {
            value: true,
            message: "Số điện thoại không được để trống",
          },
          pattern: {
            value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            message: "Số điện thoại không hợp lệ",
          },
        })}
      />
      <button className={styles.btn} type="submit">
        Đăng ký
      </button>
    </form>
  );
};

export default Register;
