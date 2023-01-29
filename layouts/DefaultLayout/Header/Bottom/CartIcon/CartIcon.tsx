import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  cartActions,
  cartSelector,
} from "../../../../../redux/slice/cartSlice";
import { useAppDispatch } from "../../../../../redux/store";
import { publicRoutes } from "../../../../../utils/routes";
import styles from "../style.module.css";
type Props = {};

const CartIcon = (props: Props) => {
  const { count } = useSelector(cartSelector);

  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(cartActions.fetchCart());
  }, []);

  return (
    <Link href={publicRoutes.cart} className={styles.cartLink}>
      Giỏ hàng ({count})
    </Link>
  );
};

export default CartIcon;
