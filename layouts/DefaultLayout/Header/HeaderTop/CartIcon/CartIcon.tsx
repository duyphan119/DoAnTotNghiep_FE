import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Link from "next/link";
import { Badge, withStyles } from "@mui/material";
import { useCartContext } from "../../../../../context/CartContext";
type Props = {};

const CartIcon = (props: Props) => {
  const { count } = useCartContext();
  return (
    <>
      {/* <Badge
        badgeContent={count}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "var(--primary-color)",
            color: "white",
          },
        }}
      >
        <Link href="/cart">
          <ShoppingBagOutlinedIcon />
        </Link>
      </Badge> */}
      <Link href="/cart">Giỏ hàng ({count})</Link>
    </>
  );
};

export default CartIcon;
