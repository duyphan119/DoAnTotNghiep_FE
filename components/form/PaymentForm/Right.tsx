import { ButtonControl } from "@/components";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { OrderDiscountModel } from "@/models";
import { cartSelector } from "@/redux/slice/cartSlice";
import { CheckoutDTO } from "@/types/dtos";
import { publicRoutes } from "@/utils/routes";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC, memo, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";

type Props = {
  disabled: boolean;
  orderDiscount: OrderDiscountModel;
  total: number;
  onUseOrderDiscount: (code: string) => Promise<void>;
  onCancelOrderDiscount: () => void;
  register: UseFormRegister<CheckoutDTO>;
  onUsePoint: () => void;
};

const Right: FC<Props> = ({
  disabled,
  orderDiscount,
  total,
  onUseOrderDiscount,
  onCancelOrderDiscount,
  register,
  onUsePoint,
}) => {
  const { profile } = useDefaultLayoutContext();

  const { cart } = useSelector(cartSelector);

  const discountRef = useRef<HTMLInputElement>(null);

  const handleUseOrderDiscount = () => {
    if (discountRef.current) {
      const code = discountRef.current.value;
      onUseOrderDiscount(code);
    }
  };

  const handleUsePoint = () => {
    onUsePoint();
  };

  return (
    <Grid item xs={12} md={4}>
      <h1 className={styles.h1}>Đơn hàng</h1>
      <ul className={styles.items}>
        {cart.items.map((item) => {
          return (
            <li key={item.id} className={styles.item}>
              <div className={styles.start}>
                <Image
                  width={64}
                  height={64}
                  priority={true}
                  alt=""
                  src={item.getThumbnail()}
                />
              </div>
              <div className={styles.center}>
                <div className={styles.name}>
                  {item.productVariant?.product?.name}
                </div>
                <div className={styles.variants}>
                  {item.productVariant?.variantValues.map((variantValue) => {
                    return (
                      <div key={variantValue.id}>
                        {variantValue?.variant?.name}: {variantValue.value}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.right}>
                <div>{item.price}</div>
                <div>x{item.quantity}</div>
                <div className={styles.total}>{item.getTotalPrice()}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className={styles.discountTitle}>Sử dụng mã giảm giá</div>
          <div className={styles.discount}>
            <input
              placeholder="Nhập mã giảm giá"
              ref={discountRef}
              disabled={disabled}
            />
            <button
              type="button"
              onClick={handleUseOrderDiscount}
              disabled={disabled}
            >
              Sử dụng
            </button>
          </div>
          {orderDiscount.id > 0 ? (
            <div className={styles.usingDiscount}>
              Đã áp dụng mã giảm giá {orderDiscount.code}.
              <span
                className={styles.cancelDiscount}
                onClick={() => onCancelOrderDiscount()}
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
              disabled={disabled}
              {...register("point")}
            />
            <button type="button" onClick={handleUsePoint} disabled={disabled}>
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
            <span style={{ color: "red" }}>-{orderDiscount.value}đ</span>
          </li>
        ) : null}
        <li className={styles["last-row"]}>
          <span>Tổng cộng</span>
          <span>{total - (orderDiscount ? orderDiscount.value : 0)}đ</span>
        </li>
        <li className={styles.actions}>
          <Link href={publicRoutes.cart}>Quay lại giỏ hàng</Link>
          <ButtonControl type="submit" disabled={disabled}>
            Thanh toán
          </ButtonControl>
        </li>
      </ul>
    </Grid>
  );
};

export default memo(Right);
