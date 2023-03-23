import { ButtonControl, InputControl } from "@/components";
import { authActions, authReducer } from "@/redux/slice/authSlice";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import { useAppDispatch } from "@/redux/store";
import styles from "@/styles/_AuthForm.module.scss";
import { RegisterDTO } from "@/types/dtos";
import { publicRoutes } from "@/utils/routes";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

type Props = {
  action: "signin" | "signup";
  hideLinks?: boolean;
};

const AuthForm: FC<Props> = ({ action, hideLinks }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterDTO>();

  const appDispatch = useAppDispatch();

  const { reducer, pathNavigate, isLoading } = useSelector(fetchSelector);

  const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
    if (action === "signin")
      appDispatch(
        authActions.fetchLogin({ email: data.email, password: data.password })
      );
    else if (action === "signup") appDispatch(authActions.fetchRegister(data));
    setValue("fullName", "");
    setValue("email", "");
    setValue("password", "");
    setValue("phone", "");
  };

  useEffect(() => {
    if (pathNavigate !== "") {
      router.push(pathNavigate);
      appDispatch(fetchActions.endNavigate());
    }
  }, [pathNavigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1>{action === "signin" ? "Đăng nhập" : "Đăng ký tài khoản"}</h1>
          {action === "signup" ? (
            <InputControl
              useMuiCustom={true}
              error={errors.fullName}
              label="Họ tên"
              register={register("fullName", {
                required: {
                  value: true,
                  message: "Họ tên không được để trống",
                },
              })}
              placeholder="Họ tên"
              startIcon={<PersonIcon />}
            />
          ) : null}
          <InputControl
            useMuiCustom={true}
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
            startIcon={<EmailIcon />}
            placeholder="Email"
          />
          <InputControl
            useMuiCustom={true}
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
            startIcon={<PasswordIcon />}
            placeholder="Mật khẩu"
          />
          {action === "signup" ? (
            <InputControl
              useMuiCustom={true}
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
              placeholder="Số điện thoại"
              startIcon={<PhoneAndroidIcon />}
            />
          ) : null}
          {hideLinks ? (
            <></>
          ) : (
            <div className={`flex-center ${styles.link}`}>
              Bạn {action === "signin" ? "chưa" : "đã"} có tài khoản?&nbsp;
              <Link
                href={
                  action === "signin"
                    ? publicRoutes.userSignup
                    : publicRoutes.userSignin
                }
              >
                {action === "signin" ? "Đăng ký" : "Đăng nhập"}
              </Link>
            </div>
          )}

          <ButtonControl
            type="submit"
            sx={{
              width: "100%",
            }}
            isLoading={
              ((action === "signin" && reducer === authReducer.fetchLogin) ||
                (action === "signup" &&
                  reducer === authReducer.fetchRegister)) &&
              isLoading
            }
          >
            {action === "signin" ? "Đăng nhập" : "Đăng ký"}
          </ButtonControl>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
