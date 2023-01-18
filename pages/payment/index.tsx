import { Container, Grid } from "@mui/material";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkout as apiCheckout } from "../../apis/order";
import { checkOrderDiscount } from "../../apis/orderdiscount";
import { getMyUserAddresses } from "../../apis/useraddress";
import { InputControl } from "../../components";
import { useCartContext } from "../../context/CartContext";
import provinces from "../../province.json";
import styles from "../../styles/Payment.module.css";
import {
  COOKIE_ORDER_DISCOUNT_CODE_NAME,
  MSG_SUCCESS,
} from "../../utils/constants";
import { getPriceCartItem, getThumbnailOrderItem } from "../../utils/helpers";
import {
  OrderDiscount,
  OrderItem,
  UserAddress,
  VariantValue,
} from "../../utils/types";

type Props = {};

type Inputs = {
  fullName: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  ward: string;
};

type Discount = {
  code: string;
  value: number;
  id: number;
};

const Payment = (props: Props) => {
  const router = useRouter();
  const { cart, checkout, total } = useCartContext();
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [orderDiscount, setOrderDiscount] = useState<OrderDiscount | null>(
    null
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  useEffect(() => {
    setValue("phone", cart.phone || "");
    setValue("fullName", cart.fullName || "");
  }, [cart]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { message } = await apiCheckout({
        ...data,
        paymentMethod,
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
      });
      if (message === MSG_SUCCESS) {
        checkout();
        router.push("/payment/success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = +e.target.value;
    const result = userAddresses.find((_) => _.id === id);

    if (result) {
      setUserAddress(result);
    }
  };

  const handleUse = async () => {
    try {
      if (code !== "") {
        const { message, data } = await checkOrderDiscount(code, total);
        if (message === MSG_SUCCESS) {
          setOrderDiscount(data);
          setCode("");
        }
      }
    } catch (error) {
      console.log("CHECK ORDER DISCOUNT CODE ERROR", error);
    }
  };

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const { message, data } = await getMyUserAddresses();
        if (message === MSG_SUCCESS) {
          setUserAddresses(data.items);
          if (data.count > 0) {
            const userAddress = data.items[0];
            setUserAddress(userAddress);
          }
          setVisible(data.count > 0);
        }
      } catch (error) {
        console.log("FETCH USER ADDRESS ERROR", error);
      }
    };

    fetchUserAddresses();
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "province") {
          const { province } = value;
          if (province !== "") {
            setDistricts(
              provinces.find((p: any) => p.name === province)?.districts
            );
            value.district = "";
            value.ward = "";
          }
        }
        if (name === "district") {
          const { district, province } = value;
          if (province !== "" && district !== "") {
            const dis = provinces
              .find((p: any) => p.name === province)
              ?.districts.find((d: any) => d.name === district);
            setWards(dis ? dis.wards : []);
            value.ward = "";
          } else {
            console.log("ngu");
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  console.log({ visible, userAddress });

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
                    <div className="form-group">
                      <select
                        className="form-control"
                        value={userAddress.id}
                        onChange={handleChange}
                      >
                        {userAddresses.map((item: UserAddress) => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.address},&nbsp;{item.ward}
                              ,&nbsp;{item.district},&nbsp;
                              {item.province}
                            </option>
                          );
                        })}
                      </select>
                      <label htmlFor="" className="form-label required">
                        Địa chỉ
                      </label>
                    </div>
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <div
                    style={{ cursor: "pointer", color: "var(--primary-color)" }}
                    onClick={() => setVisible((v) => !v)}
                  >
                    {visible ? "+ Thêm địa chỉ khác" : "Sổ địa chỉ"}
                  </div>
                </Grid>
                {!visible ? (
                  <>
                    <Grid item xs={12}>
                      <div className="form-group">
                        {errors.province &&
                          errors.province.type === "required" && (
                            <div className="form-error">
                              Tỉnh / Thành phố không được để trống
                            </div>
                          )}
                        <select
                          className="form-control"
                          {...register("province", { required: true })}
                        >
                          <option value="">Chọn Tỉnh / Thành phố</option>
                          {provinces.map((pro: any) => {
                            return (
                              <option value={pro.name} key={pro.name}>
                                {pro.name}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="" className="form-label required">
                          Tỉnh / Thành phố
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="form-group">
                        {errors.district &&
                          errors.district.type === "required" && (
                            <div className="form-error">
                              Quận / Huyện không được để trống
                            </div>
                          )}
                        <select
                          className="form-control"
                          {...register("district", { required: true })}
                        >
                          <option value="">Chọn Quận / Huyện</option>
                          {districts.map((dis: any) => {
                            return (
                              <option value={dis.name} key={dis.name}>
                                {dis.name}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="" className="form-label required">
                          Quận / Huyện
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="form-group">
                        {errors.ward && errors.ward.type === "required" && (
                          <div className="form-error">
                            Phường / Xã không được để trống
                          </div>
                        )}
                        <select
                          className="form-control"
                          {...register("ward", { required: true })}
                        >
                          <option value="">Chọn Phường / Xã</option>
                          {wards.map((w: any) => {
                            return (
                              <option value={w.name} key={w.name}>
                                {w.name}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="" className="form-label required">
                          Phường / Xã
                        </label>
                      </div>
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
                  <div className={styles.radio}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentMethod1"
                      hidden
                      defaultChecked={paymentMethod === "COD"}
                    />
                    <div className={styles.circle}></div>
                    <label
                      htmlFor="paymentMethod1"
                      onClick={() => setPaymentMethod("COD")}
                    >
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={styles.radio}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentMethod2"
                      hidden
                      defaultChecked={paymentMethod === "Momo"}
                    />
                    <div className={styles.circle}></div>
                    <label
                      htmlFor="paymentMethod2"
                      onClick={() => setPaymentMethod("Momo")}
                    >
                      Thanh toán qua Momo
                    </label>
                  </div>
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
                  <div className={styles.discount}>
                    <input
                      placeholder="Nhập mã giảm giá"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button type="button" onClick={handleUse}>
                      Sử dụng
                    </button>
                  </div>
                  {orderDiscount ? (
                    <div className={styles.usingDiscount}>
                      Đã áp dụng mã giảm giá {orderDiscount.code}.
                      <span
                        className={styles.cancelDiscount}
                        onClick={() => setOrderDiscount(null)}
                      >
                        Hủy
                      </span>
                    </div>
                  ) : null}
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
                  <Link href="/cart">Quay lại giỏ hàng</Link>
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
