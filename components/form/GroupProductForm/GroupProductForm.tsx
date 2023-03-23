import { Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  DashboardPaper,
  FooterForm,
  InputControl,
  SelectControl,
} from "@/components";
import { AdminLayout } from "@/layouts";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import {
  groupProductActions,
  groupProductReducer,
  groupProductSelector,
} from "@/redux/slice/groupProductSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateGroupProductDTO } from "@/types/dtos";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";
import { snackbarActions } from "@/redux/slice/snackbarSlice";

type Props = {};

const GroupProductForm = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(groupProductSelector);
  const { resetForm, isLoading, reducer } = useSelector(fetchSelector);
  const [files, setFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateGroupProductDTO>({
    defaultValues: {
      isAdult: true,
      description: "",
      sex: "Nam",
      name: "",
    },
  });
  const onSubmit: SubmitHandler<CreateGroupProductDTO> = (data) => {
    if (current.id > 0) {
      appDispatch(
        groupProductActions.fetchUpdate({
          id: current.id,
          dto: {
            ...data,
            isAdult: "" + data.isAdult === "true" ? true : false,
          },
          files,
        })
      );
    } else {
      appDispatch(
        groupProductActions.fetchCreate({
          files,
          dto: {
            ...data,
            isAdult: "" + data.isAdult === "true" ? true : false,
          },
        })
      );
    }
  };

  const formLoading =
    (reducer === groupProductReducer.fetchCreate ||
      reducer === groupProductReducer.fetchUpdate) &&
    isLoading;

  const handleResetForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("sex", "Nam");
    setValue("isAdult", true);
    setFiles(null);
  };

  useEffect(() => {
    if (current.id > 0) {
      setValue("name", current.name);
      setValue("description", current.description);
      setValue("sex", current.sex);
      setValue("isAdult", current.isAdult);
      setValue("thumbnail", current.thumbnail);
    }
  }, [current]);

  useEffect(() => {
    if (resetForm) {
      handleResetForm();
      appDispatch(fetchActions.endResetForm());
    }
  }, [resetForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12}>
          <InputControl
            label="Tên nhóm sản phẩm"
            error={errors.name}
            register={register("name", {
              required: {
                value: true,
                message: "Tên không được để trống",
              },
            })}
            required={true}
            disabled={formLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            label="Mô tả"
            error={errors.description}
            register={register("description")}
            disabled={formLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectControl
            label="Giới tính"
            register={register("sex")}
            options={[{ value: "Nam" }, { value: "Nữ" }]}
            disabled={formLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectControl
            label="Đối tượng"
            register={register("isAdult")}
            options={[
              { value: "true", display: "Người lớn" },
              { value: "false", display: "Trẻ em" },
            ]}
            disabled={formLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            label="Ảnh đại diện"
            error={errors.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFiles(e.target.files)
            }
            type="file"
            disabled={formLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm isLoading={formLoading} />
        </Grid>
      </Grid>
    </form>
  );
};

export default GroupProductForm;
