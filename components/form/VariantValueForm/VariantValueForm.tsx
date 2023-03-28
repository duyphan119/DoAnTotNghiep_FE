import {
  FooterForm,
  InputControl,
  RadioControl,
  SelectControl,
} from "@/components";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import { variantActions, variantSelector } from "@/redux/slice/variantSlice";
import {
  variantValueActions,
  variantValueReducer,
  variantValueSelector,
} from "@/redux/slice/variantValueSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateVariantValueDTO } from "@/types/dtos";
import { Grid, Box } from "@mui/material";
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
      hasThumbnail: false,
    },
  });

  const onSubmit: SubmitHandler<CreateVariantValueDTO> = (data) => {
    const dto: CreateVariantValueDTO = {
      ...data,
      hasThumbnail: "" + data.hasThumbnail === "true" ? true : false,
      variantId: +data.variantId,
    };
    if (current.id > 0) {
      appDispatch(
        variantValueActions.fetchUpdate({ id: current.id, dto: dto })
      );
    } else {
      appDispatch(variantValueActions.fetchCreate(dto));
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
    setValue("hasThumbnail", false);
  };

  useEffect(() => {
    appDispatch(variantActions.fetchGetAll({}));
  }, []);

  useEffect(() => {
    if (current.id > 0) {
      setValue("value", current.value);
      setValue("variantId", current.variantId);
      setValue("code", current.code);
      setValue("hasThumbnail", current.hasThumbnail);
    }
  }, [current]);

  useEffect(() => {
    if (current.id === 0 && variantData.items[0]) {
      setValue("variantId", variantData.items[0].id);
    }
  }, [current, variantData]);

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
          <Box sx={{ display: "flex" }}>
            <RadioControl
              register={register("hasThumbnail")}
              label="Không hình ảnh"
              value={false}
              wrapperStyle={{ border: "none" }}
              labelStyle={{ padding: "8px 8px 8px 32px" }}
              defaultChecked={current.id === 0 ? true : current.hasThumbnail}
            />
            <RadioControl
              register={register("hasThumbnail")}
              label="Có hình ảnh"
              value={true}
              wrapperStyle={{ border: "none" }}
              labelStyle={{ padding: "8px 8px 8px 32px" }}
              defaultChecked={current.id === 0 ? false : current.hasThumbnail}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FooterForm isLoading={formLoading} />
        </Grid>
      </Grid>
    </form>
  );
};

export default VariantValueForm;
