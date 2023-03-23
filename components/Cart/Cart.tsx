import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { cartSelector } from "@/redux/slice/cartSlice";
import { fetchSelector } from "@/redux/slice/fetchSlice";
import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CartResult from "./CartResult";
import EmptyCart from "./EmptyCart";
import TableCart from "./TableCart";
import styles from "./_style.module.scss";

type Props = {};

const Cart = (props: Props) => {
  const { cart } = useSelector(cartSelector);

  const { isSuccess } = useSelector(fetchSelector);

  return (
    <main className={styles.main}>
      {isSuccess ? (
        cart.getCount() > 0 ? (
          <Container maxWidth="lg">
            <h1>Giỏ hàng của bạn</h1>
            <TableCart />
            <CartResult />
          </Container>
        ) : (
          <EmptyCart />
        )
      ) : null}
    </main>
  );
};

export default Cart;
