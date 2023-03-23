import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { cartActions, cartSelector } from "@/redux/slice/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { publicRoutes } from "@/utils/routes";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Badge } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";
type Props = {};

const CartIcon = (props: Props) => {
  const { cart } = useSelector(cartSelector);
  const appDispatch = useAppDispatch();

  const { profile } = useDefaultLayoutContext();

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
