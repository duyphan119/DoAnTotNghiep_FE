import React from "react";
import { register as apiRegister, RegisterDTO } from "../../../apis/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../style.module.css";
import { useAuthContext } from "../../../context/AuthContext";
import { MSG_SUCCESS } from "../../../utils/constants";
type Props = {
  onClose?: any;
};

const Register = (props: Props) => {
  const { register: registerAccount } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterDTO>();
  const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
    try {
      const res = await apiRegister(data);
      const { message, data: _data } = res;
      if (message === MSG_SUCCESS) {
        registerAccount(_data.user, _data.accessToken);
        props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        {errors.fullName && errors.fullName.type === "required" && (
          <div className="form-error">Họ tên không được để trống</div>
        )}
        <input
          type="text"
          id="fullName"
          className="form-control"
          autoComplete="off"
          {...register("fullName", { required: true })}
        />
        <label htmlFor="fullName" className="form-label required">
          Họ tên
        </label>
      </div>
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
      <div className="form-group">
        {errors.phone && errors.phone.type === "required" && (
          <div className="form-error">Số điện thoại không được để trống</div>
        )}
        {errors.phone && errors.phone.type === "pattern" && (
          <div className="form-error">Số điện thoại không hợp lệ</div>
        )}
        <input
          type="text"
          id="phone"
          className="form-control"
          autoComplete="off"
          {...register("phone", {
            required: true,
            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          })}
        />
        <label htmlFor="phone" className="form-label required">
          Số điện thoại
        </label>
      </div>
      <button className={styles.btn} type="submit">
        Đăng ký
      </button>
    </form>
  );
};

export default Register;
