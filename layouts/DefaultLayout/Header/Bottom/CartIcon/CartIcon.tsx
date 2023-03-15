import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { cartActions, cartSelector } from "@/redux/slice/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { publicRoutes } from "@/utils/routes";
import styles from "./_style.module.scss";
import { authSelector } from "@/redux/slice/authSlice";
type Props = {};

const CartIcon = (props: Props) => {
  const { cart } = useSelector(cartSelector);
  const { profile } = useSelector(authSelector);

  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (profile.id > 0) {
      appDispatch(cartActions.fetchCart());
    } else {
      appDispatch(cartActions.getCart());
    }
  }, [profile]);

  return (
    <Link href={publicRoutes.cart} className={styles.cartLink}>
      <Badge badgeContent={cart.getCount()} color="info">
        <ShoppingBagOutlinedIcon />
      </Badge>
    </Link>
  );
};

export default CartIcon;
