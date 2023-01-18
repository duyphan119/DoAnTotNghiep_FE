import React from "react";
import { register as apiRegister, RegisterDTO } from "../../../apis/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "../../../context/AuthContext";
import { MSG_SUCCESS } from "../../../utils/constants";
import InputControl from "../../InputControl";
import styles from "../style.module.css";
type Props = Partial<{
  onClose: any;
}>;

const Register = ({ onClose }: Props) => {
  const { register: registerAccount } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>();
  const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
    try {
      const res = await apiRegister(data);
      const { message, data: _data } = res;
      if (message === MSG_SUCCESS) {
        registerAccount(_data.user, _data.accessToken);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
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
