import { OrderDiscountApi } from "@/api";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { OrderDiscountModel, UserAddressModel } from "@/models";
import { cartActions, cartSelector } from "@/redux/slice/cartSlice";
import { orderActions, orderSelector } from "@/redux/slice/orderSlice";
import { snackbarActions } from "@/redux/slice/snackbarSlice";
import { userAddressActions } from "@/redux/slice/userAddressSlice";
import { useAppDispatch } from "@/redux/store";
import { CheckoutDTO } from "@/types/dtos";
import { DistrictJson, WardJson } from "@/types/json";
import { publicRoutes } from "@/utils/routes";
import { Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useReducer } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Left from "./Left";
import Right from "./Right";
type Props = {};

type State = {
  districts: DistrictJson[];
  wards: WardJson[];
  paymentMethod: "COD" | "MOMO";
  userAddresses: UserAddressModel[];
  userAddress: UserAddressModel;
  visible: boolean;
  code: string;
  orderDiscount: OrderDiscountModel;
  usePoint: boolean;
};

const reducers = (
  state: State,
  {
    type,
    payload,
  }: {
    payload: any;
    type?: string;
  }
) => {
  switch (type) {
    default: {
      return { ...state, ...payload };
    }
  }
};

const initialState: State = {
  districts: [],
  wards: [],
  paymentMethod: "COD",
  userAddresses: [],
  userAddress: new UserAddressModel(),
  visible: false,
  code: "",
  orderDiscount: new OrderDiscountModel(),
  usePoint: false,
};

const PaymentForm: FC<Props> = () => {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { cart } = useSelector(cartSelector);
  const { isCheckoutSuccess } = useSelector(orderSelector);

  const { profile } = useDefaultLayoutContext();

  const total = useMemo(() => cart.getTotalPrice(), [cart]);

  const [state, dispatch] = useReducer(reducers, initialState);
  const { districts, orderDiscount, userAddress, visible, wards, usePoint } =
    state as State;

  const disabled = useMemo(() => {
    return profile.id === 0;
  }, [profile]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CheckoutDTO>();
  useEffect(() => {
    setValue("phone", cart.phone || "");
    setValue("fullName", cart.fullName || "");
    setValue("point", 0);
    setValue("province", cart.province || "");
    setValue("district", cart.district || "");
    setValue("ward", cart.ward || "");
    setValue("total", cart.getTotalPrice());
  }, [cart]);
  const onSubmit: SubmitHandler<CheckoutDTO> = async (data) => {
    try {
      const reqData = {
        ...data,
        shippingPrice: 0,
        ...(visible && userAddress.id > 0
          ? {
              province: userAddress.province,
              district: userAddress.district,
              ward: userAddress.ward,
              address: userAddress.address,
            }
          : {}),
        ...(orderDiscount.id > 0 ? { discountId: orderDiscount.id } : {}),
        point: usePoint ? +data.point : 0,
        total,
      };

      appDispatch(orderActions.fetchCheckout(reqData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUseOrderDiscount = async (code: string) => {
    try {
      const odApi = new OrderDiscountApi();
      if (code !== "") {
        const data: OrderDiscountModel = await odApi.check({ code, total });
        if (data.id > 0) {
          dispatch({ payload: { orderDiscount: data, code: "" } });
        } else {
          appDispatch(
            snackbarActions.show({
              msg: "Mã giảm giá không hợp lệ",
              type: "error",
            })
          );
        }
      }
    } catch (error) {
      console.log("Kiểm tra mã giảm giá lỗi", error);
    }
  };

  const handleUsePoint = () => {
    dispatch({ payload: { usePoint: true } });
  };

  useEffect(() => {
    appDispatch(userAddressActions.fetchGetAll({}));
  }, []);

  useEffect(() => {
    if (profile.id > 0) {
      appDispatch(cartActions.fetchCart());
    } else {
      appDispatch(cartActions.getCart());
    }
  }, [profile]);

  useEffect(() => {
    if (isCheckoutSuccess) router.push(publicRoutes.paymentSuccess);
  }, [isCheckoutSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          {disabled ? (
            <div className="flex">
              Bạn cần đăng nhập để có thể đặt hàng.&nbsp;
              <Link
                style={{ color: "var(--blue)" }}
                href={publicRoutes.userSignin}
              >
                Đăng nhập
              </Link>
            </div>
          ) : (
            <></>
          )}
        </Grid>
        <Left
          districts={districts}
          wards={wards}
          disabled={disabled}
          errors={errors}
          register={register}
          userAddress={userAddress}
          visible={visible}
          onChange={(userAddress: UserAddressModel) => {
            dispatch({ payload: { userAddress } });
          }}
          onToggle={() => dispatch({ payload: { visible: !visible } })}
          watch={watch}
          onUpdateDistricts={(districts: DistrictJson[]) => {
            dispatch({ payload: { districts } });
          }}
          onUpdateWards={(wards: WardJson[]) => {
            dispatch({ payload: { wards } });
          }}
        />
        <Right
          disabled={disabled}
          total={total}
          orderDiscount={orderDiscount}
          onUseOrderDiscount={(code: string) => handleUseOrderDiscount(code)}
          onCancelOrderDiscount={() => {
            dispatch({ payload: { orderDiscount: null } });
          }}
          register={register}
          onUsePoint={() => handleUsePoint()}
        />
      </Grid>
    </form>
  );
};

export default PaymentForm;
