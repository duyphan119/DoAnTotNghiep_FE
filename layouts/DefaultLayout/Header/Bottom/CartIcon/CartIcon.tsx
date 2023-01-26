import Link from "next/link";
import { useCartContext } from "../../../../../context/CartContext";
import { publicRoutes } from "../../../../../utils/routes";
import styles from "../style.module.css";
type Props = {};

const CartIcon = (props: Props) => {
  const { count } = useCartContext();
  return (
    <>
      {/* <Badge
        badgeContent={count}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "var(--blue)",
            color: "white",
          },
        }}
      >
        <Link href="/cart">
          <ShoppingBagOutlinedIcon />
        </Link>
      </Badge> */}
      <Link href={publicRoutes.cart} className={styles.cartLink}>
        Giỏ hàng ({count})
      </Link>
    </>
  );
};

export default CartIcon;
