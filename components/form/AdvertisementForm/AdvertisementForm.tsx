import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import { FooterForm, InputControl } from "../../../components";
import {
  advertisementActions,
  advertisementReducer,
  advertisementSelector,
} from "../../../redux/slice/advertisementSlice";
import { fetchSelector } from "../../../redux/slice/fetchSlice";
import { useAppDispatch } from "../../../redux/store";
import { CreateAdvertisementDTO } from "../../../types/dtos";
type Props = {};

const AdvertisementForm = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(advertisementSelector);
  const { isLoading, reducer } = useSelector(fetchSelector);
  const [files, setFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateAdvertisementDTO>();

  const onSubmit: SubmitHandler<CreateAdvertisementDTO> = (data) => {
    if (current) {
      appDispatch(
        advertisementActions.fetchUpdate({
          id: current.id,
          files,
          dto: data,
        })
      );
    } else {
      appDispatch(
        advertisementActions.fetchCreate({
          files,
          dto: data,
        })
      );
    }
  };

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      appDispatch(advertisementActions.fetchGetById(+`${id}`));
    }
  }, [router.query]);

  useEffect(() => {
    if (current) {
      setValue("href", current.href);
      setValue("title", current.title);
      setValue("page", current.page);
    }
  }, [current]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12}>
          <InputControl
            register={register("title", {
              required: {
                value: true,
                message: "Tiêu đề không được để trống",
              },
            })}
            error={errors.title}
            label="Tiêu đề"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl register={register("page")} label="Trang" />
        </Grid>
        <Grid item xs={12}>
          <InputControl register={register("href")} label="Liên kết" />
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
              (reducer === advertisementReducer.fetchCreate ||
                reducer === advertisementReducer.fetchUpdate) &&
              isLoading
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AdvertisementForm;
