import { FooterForm, InputControl, SelectControl } from "@/components";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import { variantActions, variantSelector } from "@/redux/slice/variantSlice";
import {
  variantValueActions,
  variantValueReducer,
  variantValueSelector,
} from "@/redux/slice/variantValueSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateVariantValueDTO } from "@/types/dtos";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
type Props = {};

const VariantValueForm = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { isLoading, reducer, resetForm } = useSelector(fetchSelector);
  const { current } = useSelector(variantValueSelector);
  const { variantData } = useSelector(variantSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateVariantValueDTO>({
    defaultValues: {
      value: "",
      variantId: 0,
      code: "",
    },
  });

  const onSubmit: SubmitHandler<CreateVariantValueDTO> = (data) => {
    if (current.id > 0) {
      appDispatch(
        variantValueActions.fetchUpdate({ id: current.id, dto: data })
      );
    } else {
      appDispatch(variantValueActions.fetchCreate(data));
    }
  };

  const formLoading =
    (reducer === variantValueReducer.fetchCreate ||
      reducer === variantValueReducer.fetchUpdate) &&
    isLoading;

  const handleResetForm = () => {
    setValue("value", "");
    setValue("variantId", 0);
    setValue("code", "");
  };

  useEffect(() => {
    appDispatch(variantActions.fetchGetAll({}));
  }, []);

  useEffect(() => {
    if (current.id > 0) {
      setValue("value", current.value);
      setValue("variantId", current.variantId);
      setValue("code", current.code);
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
            label="Mã thuộc tính"
            error={errors.value}
            register={register("code", {
              required: {
                value: true,
                message: "Mã thuộc tính không được để trống",
              },
            })}
            required={true}
            disabled={formLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectControl
            label="Loại thuộc tính"
            error={errors.value}
            register={register("variantId", {
              min: {
                value: 1,
                message: "Loại thuộc tính không được để trống",
              },
            })}
            required={true}
            disabled={formLoading}
            options={variantData.items.map((item) => ({
              display: item.name,
              value: item.id,
            }))}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            label="Giá trị"
            error={errors.value}
            register={register("value", {
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
          <FooterForm isLoading={formLoading} />
        </Grid>
      </Grid>
    </form>
  );
};

export default VariantValueForm;
