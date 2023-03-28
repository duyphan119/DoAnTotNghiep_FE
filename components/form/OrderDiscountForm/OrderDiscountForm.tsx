import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { fetchSelector } from "../../../redux/slice/fetchSlice";
import {
  orderDiscountActions,
  orderDiscountReducer,
  orderDiscountSelector,
} from "../../../redux/slice/orderDiscountSlice";
import { useAppDispatch } from "../../../redux/store";
import { CreateOrderDiscountDTO } from "../../../types/dtos";
import { FooterForm, InputControl } from "../../common";

type Props = {};

const OrderDiscountForm = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(orderDiscountSelector);
  const { isLoading, reducer } = useSelector(fetchSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateOrderDiscountDTO>();

  const onSubmit: SubmitHandler<CreateOrderDiscountDTO> = (data) => {
    const reqData: CreateOrderDiscountDTO = {
      ...data,
      minPrice: +data.minPrice,
      value: +data.value,
      start: new Date(data.start),
      end: new Date(data.end),
    };
    if (current.id > 0) {
      appDispatch(
        orderDiscountActions.fetchUpdate({
          id: current.id,
          dto: reqData,
        })
      );
    } else {
      appDispatch(orderDiscountActions.fetchCreate(reqData));
    }
  };

  useEffect(() => {
    if (current) {
      setValue("minPrice", current.minPrice);
      setValue("value", current.value);
      setValue("start", new Date(current.start));
      setValue("end", new Date(current.end));
      setValue("code", current.code);
    }
  }, [current]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12}>
          <InputControl
            register={register("code", {
              required: {
                value: true,
                message: "Mã giảm giá không được để trống",
              },
            })}
            error={errors.code}
            label="Mã giảm giá"
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputControl
            register={register("minPrice")}
            label="Tiền tối thiểu"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputControl
            register={register("value", {
              required: {
                value: true,
                message: "Tiền giảm không được để trống",
              },
            })}
            error={errors.value}
            label="Tiền giảm"
            type="number"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            register={register("start")}
            label="Bắt đầu"
            type="date"
          />
        </Grid>
        <Grid item xs={12}>
          <InputControl
            register={register("end")}
            label="Kết thúc"
            type="date"
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm
            isLoading={
              (reducer === orderDiscountReducer.fetchCreate ||
                reducer === orderDiscountReducer.fetchUpdate) &&
              isLoading
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderDiscountForm;
