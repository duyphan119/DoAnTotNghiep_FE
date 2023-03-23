import { FooterForm, InputControl } from "@/components";
import { fetchSelector } from "@/redux/slice/fetchSlice";
import {
  variantActions,
  variantReducer,
  variantSelector,
} from "@/redux/slice/variantSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateVariantDTO } from "@/types/dtos";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
type Props = {};

const VariantForm = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { isLoading, reducer } = useSelector(fetchSelector);
  const { current } = useSelector(variantSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateVariantDTO>({ defaultValues: { name: "" } });

  const onSubmit: SubmitHandler<CreateVariantDTO> = (data) => {
    if (current.id > 0) {
      appDispatch(variantActions.fetchUpdate({ id: current.id, dto: data }));
    } else {
      appDispatch(variantActions.fetchCreate(data));
    }
  };

  useEffect(() => {
    if (current.id > 0) {
      setValue("name", current.name);
    }
  }, [current]);

  const formLoading =
    (reducer === variantReducer.fetchCreate ||
      reducer === variantReducer.fetchUpdate) &&
    isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} md={6}>
          <InputControl
            label="Tên loại thuộc tính"
            error={errors.name}
            register={register("name", {
              required: {
                value: true,
                message: "Tên không được để trống",
              },
            })}
            required={true}
            disabled={formLoading}
            // useMuiCustom={true}
            // variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm isLoading={formLoading} />
        </Grid>
      </Grid>
    </form>
  );
};

export default VariantForm;
