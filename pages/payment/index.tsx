import { Container, Grid } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useReducer, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CheckoutDTO } from "../../apis/order";
import { checkOrderDiscount } from "../../apis/orderdiscount";
import { InputControl, RadioControl, SelectControl } from "../../components";
import provinces from "../../province.json";
import { authSelector } from "../../redux/slice/authSlice";
import { cartActions, cartSelector } from "../../redux/slice/cartSlice";
import { snackbarActions } from "../../redux/slice/snackbarSlice";
import {
  userAddressActions,
  userAddressSelector,
} from "../../redux/slice/userAddressSlice";
import { useAppDispatch } from "../../redux/store";
import styles from "../../styles/_Payment.module.scss";
import { MSG_SUCCESS } from "../../utils/constants";
import { getPriceCartItem, getThumbnailOrderItem } from "../../utils/helpers";
import { publicRoutes } from "../../utils/routes";
import {
  District,
  OrderDiscount,
  OrderItem,
  Province,
  UserAddress,
  VariantValue,
  Ward,
} from "../../utils/types";

type Props = {};

type Action = {
  payload: any;
  type?: string;
};

type State = {
  districts: District[];
  wards: Ward[];
  paymentMethod: "COD" | "MOMO";
  userAddresses: UserAddress[];
  userAddress: UserAddress | null;
  visible: boolean;
  code: string;
  orderDiscount: OrderDiscount | null;
  usePoint: boolean;
};

const reducers = (state: State, action: Action) => {
  const { type, payload } = action;

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
  userAddress: null,
  visible: false,
  code: "",
  orderDiscount: null,
  usePoint: false,
};

const Payment = (props: Props) => {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { cart, total, isPaymentSuccess } = useSelector(cartSelector);
  const { userAddresses } = useSelector(userAddressSelector);
  const { profile } = useSelector(authSelector);

  const [state, dispatch] = useReducer(reducers, initialState);
  const { districts, orderDiscount, userAddress, visible, wards, usePoint } =
    state as State;

  const discountRef = useRef<HTMLInputElement>(null);

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
  }, [cart]);
  const onSubmit: SubmitHandler<CheckoutDTO> = async (data) => {
    try {
      const reqData = {
        ...data,
        shippingPrice: 0,
        ...(visible && userAddress
          ? {
              province: userAddress.province,
              district: userAddress.district,
              ward: userAddress.ward,
              address: userAddress.address,
            }
          : {}),
        ...(orderDiscount ? { discountId: orderDiscount.id } : {}),
        point: usePoint ? +data.point : 0,
      };
      appDispatch(cartActions.fetchCheckout(reqData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = +e.target.value;
    const result = userAddresses.find((_) => _.id === id);

    if (result) {
      dispatch({ payload: { userAddress: result } });
    }
  };

  const handleUse = async () => {
    try {
      if (discountRef.current) {
        const code = discountRef.current.value;
        if (code !== "") {
          const { message, data } = await checkOrderDiscount(code, total);
          if (message === MSG_SUCCESS) {
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
      }
    } catch (error) {
      console.log("CHECK ORDER DISCOUNT CODE ERROR", error);
    }
  };

  const handleUsePoint = () => {
    dispatch({ payload: { usePoint: true } });
  };

  useEffect(() => {
    appDispatch(userAddressActions.fetchGetUserAddresses());
  }, []);

  useEffect(() => {
    if (isPaymentSuccess) router.push(publicRoutes.paymentSuccess);
  }, [isPaymentSuccess]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "province") {
          const { province } = value;
          if (province !== "") {
            const findProvince = provinces.find(
              (p: Province) => p.name === province
            );
            const districts = findProvince ? findProvince.districts : [];
            dispatch({ payload: { districts } });

            value.district = "";
            value.ward = "";
          }
        }
        if (name === "district") {
          const { district, province } = value;
          if (province !== "" && district !== "") {
            const findDistrict = provinces
              .find((p: Province) => p.name === province)
              ?.districts.find((d: District) => d.name === district);
            const wards = findDistrict ? findDistrict.wards : [];
            dispatch({ payload: { wards } });
            value.ward = "";
          } else {
            console.log("Error");
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <>
        <Head>
          <title>Thanh toán đơn hàng</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
      <Container maxWidth="lg" sx={{ marginBlock: "24px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} md={8}>
              <h1>Thông tin đặt hàng</h1>
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={12} md={6}>
                  <InputControl
                    label="Họ tên"
                    error={errors.fullName}
                    register={register("fullName", {
                      required: {
                        value: true,
                        message: "Họ tên không được để trống",
                      },
                      minLength: {
                        value: 6,
                        message: "Mật khẩu ít nhất 6 kí tự",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                  />
                </Grid>
                {visible && userAddress ? (
                  <Grid item xs={12}>
                    <SelectControl
                      label="Địa chỉ"
                      options={userAddresses.map((item: UserAddress) => ({
                        value: item.id,
                        display: `${item.address}, ${item.ward}
                        , ${item.district}, 
                        ${item.province}`,
                      }))}
                      value={userAddress.id}
                      onChange={handleChange}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <div
                    style={{ cursor: "pointer", color: "var(--blue)" }}
                    onClick={() => dispatch({ payload: { visible: !visible } })}
                  >
                    {visible ? "+ Thêm địa chỉ khác" : "Sổ địa chỉ"}
                  </div>
                </Grid>
                {!visible ? (
                  <>
                    <Grid item xs={12}>
                      <SelectControl
                        label="Tỉnh / Thành phố"
                        options={provinces.map((pro: any) => ({
                          value: pro.name,
                        }))}
                        register={register("province", {
                          required: {
                            value: true,
                            message: "Tỉnh / Thành phố không được để trống",
                          },
                        })}
                        required={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SelectControl
                        label="Quận / Huyện"
                        options={districts.map((dis: any) => ({
                          value: dis.name,
                        }))}
                        register={register("district", {
                          required: {
                            value: true,
                            message: "Quận / Huyện không được để trống",
                          },
                        })}
                        required={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SelectControl
                        label="Phường / Xã"
                        options={wards.map((w: any) => ({
                          value: w.name,
                        }))}
                        register={register("ward", {
                          required: {
                            value: true,
                            message: "Phường / Xã không được để trống",
                          },
                        })}
                        required={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputControl
                        label="Địa chỉ"
                        error={errors.address}
                        register={register("address", {
                          required: {
                            value: true,
                            message: "Địa chỉ không được để trống",
                          },
                        })}
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <h1>Phương thức thanh toán</h1>
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={12}>
                  <RadioControl
                    defaultChecked={true}
                    register={register("paymentMethod")}
                    label="Thanh toán khi nhận hàng (COD)"
                    value="COD"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioControl
                    register={register("paymentMethod")}
                    label="Thanh toán qua MOMO"
                    value="MOMO"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <h1>Đơn hàng</h1>
              <ul className={styles.items}>
                {cart.items.map((item: OrderItem) => {
                  return (
                    <li key={item.id} className={styles.item}>
                      <div className={styles.start}>
                        <Image
                          width={64}
                          height={64}
                          priority={true}
                          alt=""
                          src={getThumbnailOrderItem(item)}
                        />
                      </div>
                      <div className={styles.center}>
                        <div className={styles.name}>
                          {item.productVariant?.product?.name}
                        </div>
                        <div className={styles.variants}>
                          {item.productVariant?.variantValues.map(
                            (variantValue: VariantValue) => {
                              return (
                                <div key={variantValue.id}>
                                  {variantValue?.variant?.name}:{" "}
                                  {variantValue.value}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <div className={styles.right}>
                        <div>{getPriceCartItem(item)}</div>
                        <div>x{item.quantity}</div>
                        <div className={styles.total}>
                          {getPriceCartItem(item) * item.quantity}
                        </div>
                      </div>
                    </li>
                  );
                })}
                <li>
                  <div className={styles.discountTitle}>
                    Sử dụng mã giảm giá
                  </div>
                  <div className={styles.discount}>
                    <input placeholder="Nhập mã giảm giá" ref={discountRef} />
                    <button type="button" onClick={handleUse}>
                      Sử dụng
                    </button>
                  </div>
                  {orderDiscount ? (
                    <div className={styles.usingDiscount}>
                      Đã áp dụng mã giảm giá {orderDiscount.code}.
                      <span
                        className={styles.cancelDiscount}
                        onClick={() =>
                          dispatch({ payload: { orderDiscount: null } })
                        }
                      >
                        Hủy
                      </span>
                    </div>
                  ) : null}
                </li>
                <li>
                  <div className={styles.dPointTitle}>
                    Sử dụng D-point <span>(1 D-point = 1000đ)</span>
                  </div>
                  <div className={styles.dPoint}>
                    <input
                      type="number"
                      step={1}
                      max={profile ? profile.point : 0}
                      defaultValue={0}
                      placeholder="Nhập số lượng D-point"
                      min={0}
                      {...register("point")}
                    />
                    <button type="button" onClick={handleUsePoint}>
                      Sử dụng
                    </button>
                  </div>
                </li>
                <li className={styles["first-row"]}>
                  <span>Giá gốc</span>
                  <span>{total}đ</span>
                </li>
                {orderDiscount ? (
                  <li className={styles.row}>
                    <span>Giảm giá</span>
                    <span style={{ color: "red" }}>
                      -{orderDiscount.value}đ
                    </span>
                  </li>
                ) : null}
                <li className={styles["last-row"]}>
                  <span>Tổng cộng</span>
                  <span>
                    {total - (orderDiscount ? orderDiscount.value : 0)}đ
                  </span>
                </li>
                <li className={styles.actions}>
                  <Link href={publicRoutes.cart}>Quay lại giỏ hàng</Link>
                  <button type="submit">Thanh toán</button>
                </li>
              </ul>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Payment;
