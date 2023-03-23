import { ButtonControl, InputControl } from "@/components";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { authActions, authReducer } from "@/redux/slice/authSlice";
import { fetchSelector } from "@/redux/slice/fetchSlice";
import { useAppDispatch } from "@/redux/store";
import styles from "@/styles/_Profile.module.scss";
import { ChangeProfileDTO } from "@/types/dtos";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

type Props = {};

const ProfileForm = (props: Props) => {
  const { profile } = useDefaultLayoutContext();
  const { isLoading, reducer } = useSelector(fetchSelector);
  const appDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeProfileDTO>();
  const onSubmit: SubmitHandler<ChangeProfileDTO> = (data) => {
    appDispatch(authActions.fetchChangeProfile(data));
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputControl
        defaultValue={profile.email}
        label="Email"
        disabled={true}
      />
      <InputControl
        defaultValue={profile.fullName}
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
        <ButtonControl
          type="submit"
          isLoading={reducer === authReducer.fetchChangeProfile && isLoading}
        >
          Cập nhật
        </ButtonControl>
      </div>
    </form>
  );
};

export default ProfileForm;
