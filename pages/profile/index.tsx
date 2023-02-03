import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ChangeProfile } from "../../apis/auth";
import { InputControl } from "../../components";
import { AccountLayout } from "../../layouts";
import { authActions, authSelector } from "../../redux/slice/authSlice";
import { useAppDispatch } from "../../redux/store";
import styles from "../../styles/Profile.module.css";

type Props = {};

const Profile = (props: Props) => {
  const { profile, isSuccess } = useSelector(authSelector);
  const appDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeProfile>();
  const onSubmit: SubmitHandler<ChangeProfile> = (data) => {
    appDispatch(authActions.fetchChangeProfile(data));
  };

  return (
    <AccountLayout titleHeading="Thông tin tài khoản">
      <>
        <Head>
          <title>Thông tin tài khoản</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isSuccess && profile ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputControl
              defaultValue={profile.email}
              required={true}
              register={register("email", {
                required: {
                  value: true,
                  message: "Email không được bỏ trống",
                },
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Địa chỉ email không hợp lệ",
                },
              })}
              error={errors.email}
              label="Email"
            />
            <InputControl
              defaultValue={profile.fullName}
              required={true}
              register={register("fullName", {
                required: {
                  value: true,
                  message: "Họ tên không được bỏ trống",
                },
              })}
              error={errors.fullName}
              label="Họ tên"
            />
            <InputControl
              defaultValue={profile.phone}
              required={true}
              register={register("phone", {
                required: {
                  value: true,
                  message: "Số điện thoại không được bỏ trống",
                },
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              error={errors.phone}
              label="Số điện thoại"
            />
            <div>
              <button type="submit" className={styles.btn}>
                Cập nhật
              </button>
            </div>
          </form>
        ) : null}
      </>
    </AccountLayout>
  );
};

export default Profile;
