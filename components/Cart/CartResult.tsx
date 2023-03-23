import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { cartSelector } from "@/redux/slice/cartSlice";
import { publicRoutes } from "@/utils/routes";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ButtonControl } from "../common";
import styles from "./_style.module.scss";

type Props = {};

const CartResult = (props: Props) => {
  const { cart } = useSelector(cartSelector);
  const total = cart.getTotalPrice();
  return (
    <div className={styles["cart-result"]}>
      <div className={styles.row}>
        <span>Giá gốc</span>
        <span>{total}</span>
      </div>
      <div className={styles.row}>
        <span>Tổng cộng</span>
        <span>{total}</span>
      </div>
      <Link href={publicRoutes.payment} className={styles.checkout}>
        <ButtonControl>Thanh toán</ButtonControl>
      </Link>
    </div>
  );
};

export default CartResult;
