import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { cartSelector } from "@/redux/slice/cartSlice";
import { CheckoutDTO } from "@/types/dtos";
import { Container, Grid } from "@mui/material";
import { FC, memo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import CartResult from "./CartResult";
import DiscountWrapper from "./DiscountWrapper";
import EmptyCart from "./EmptyCart";
import OrderInfo from "./OrderInfo";
import PaymentMethod from "./PaymentMethod";
import TableCart from "./TableCart";
import styles from "./_style.module.scss";

type Props = {};

const Cart: FC<Props> = () => {
  const { cart } = useSelector(cartSelector);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  //   setValue,
  // } = useForm<CheckoutDTO>();

  const comp = (
    <Container maxWidth="lg">
      <h1 className={styles.h1}>Giỏ hàng của bạn</h1>
      <TableCart />
      <CartResult />
    </Container>
  );

  return (
    <main className={styles.main}>
      {cart.getCount() > 0 ? comp : <EmptyCart />}
      {/* <Container maxWidth="lg">
        <Grid container columnSpacing={2}>
          <Grid item xs={12} lg={7}>
            <OrderInfo register={register} errors={errors} />
            <PaymentMethod />
          </Grid>
          <Grid item xs={12} lg={5}>
            <CartItems />
            <DiscountWrapper />
          </Grid>
        </Grid>
      </Container> */}
    </main>
  );
};

export default memo(Cart);
