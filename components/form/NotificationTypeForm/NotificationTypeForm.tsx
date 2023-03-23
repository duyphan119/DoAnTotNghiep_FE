import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import {
  notificationTypeActions,
  notificationTypeReducer,
  notificationTypeSelector,
} from "@/redux/slice/notificationTypeSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateNotificationTypeDTO } from "@/types/dtos";
import { Grid } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FooterForm, InputControl } from "../../common";

type Props = {};

const NotificationTypeForm = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { current } = useSelector(notificationTypeSelector);
  const [files, setFiles] = useState<FileList | null>(null);

  const { isLoading, reducer } = useSelector(fetchSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateNotificationTypeDTO>();

  const onSubmit: SubmitHandler<CreateNotificationTypeDTO> = (data) => {
    if (current.id > 0) {
      appDispatch(fetchActions.start(notificationTypeReducer.fetchUpdate));
      appDispatch(
        notificationTypeActions.fetchUpdate({
          id: current.id,
          dto: data,
          files,
        })
      );
    } else {
      appDispatch(fetchActions.start(notificationTypeReducer.fetchCreate));
      appDispatch(
        notificationTypeActions.fetchCreate({
          dto: data,
          files,
        })
      );
    }
  };

  useEffect(() => {
    if (current.id > 0) {
      setValue("name", current.name);
    }
  }, [current]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12}>
          <InputControl
            required={true}
            error={errors.name}
            label="Tên loại thông báo"
            register={register("name", {
              required: {
                value: true,
                message: "Tên loại thông báo không được để trống",
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            label="Hình ảnh"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFiles(e.target.files)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm
            isLoading={
              (reducer === notificationTypeReducer.fetchCreate ||
                reducer === notificationTypeReducer.fetchUpdate) &&
              isLoading
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default NotificationTypeForm;
