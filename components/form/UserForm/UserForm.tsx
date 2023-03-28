import { Grid } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FooterForm, InputControl } from "@/components";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import { userActions, userReducer } from "@/redux/slice/userSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateUserDTO } from "@/types/dtos";
import { useSelector } from "react-redux";
type Props = {};

const UserForm = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { isLoading, reducer, resetForm } = useSelector(fetchSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateUserDTO>();

  const onSubmit: SubmitHandler<CreateUserDTO> = (data) => {
    appDispatch(userActions.fetchCreate(data));
  };

  const handleResetForm = () => {
    setValue("fullName", "");
    setValue("email", "");
    setValue("password", "");
    setValue("phone", "");
  };

  useEffect(() => {
    if (resetForm) {
      appDispatch(fetchActions.endResetForm());
      handleResetForm();
    }
  }, [resetForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12}>
          <InputControl
            register={register("fullName", {
              required: {
                value: true,
                message: "Họ tên không được để trống",
              },
            })}
            error={errors.fullName}
            label="Họ tên"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
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
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
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
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
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
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm
            isLoading={reducer === userReducer.fetchCreate && isLoading}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
