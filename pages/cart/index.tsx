import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Container, IconButton } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { DefaultLayout } from "../../layouts";
import emptyCartPng from "../../public/empty-cart.png";
import { cartActions, cartSelector } from "../../redux/slice/cartSlice";
import { useAppDispatch } from "../../redux/store";
import styles from "../../styles/Cart.module.css";
import { getPriceCartItem, getThumbnailOrderItem } from "../../utils/helpers";
import { publicRoutes } from "../../utils/routes";
import { OrderItem } from "../../utils/types";

type Props = {};

type CartItemProps = {
  item: OrderItem;
};

const CartItem = React.memo(({ item }: CartItemProps) => {
  const appDispatch = useAppDispatch();

  const handleUpdateItem = (newQuantity: number) => {
    appDispatch(cartActions.fetchUpdateCartItem({ id: item.id, newQuantity }));
  };

  const handleDeleteItem = () => {
    appDispatch(cartActions.deleteCartItem(item.id));
  };

  const getPrice = useMemo(() => {
    return item ? getPriceCartItem(item) : 0;
  }, [item]);

  return (
    <tr>
      <td>
        <div className={styles["td-product"]}>
          <IconButton color="error" onClick={handleDeleteItem}>
            <DeleteOutlineIcon />
          </IconButton>
          <div>
            <Image
              width={72}
              height={72}
              priority={true}
              alt=""
              src={item ? getThumbnailOrderItem(item) : ""}
            />
          </div>
          <div>
            <Link
              href={{
                pathname: "/product/[slug]",
                query: { slug: item.productVariant?.product?.slug },
              }}
            >
              {item.productVariant?.product?.name}
            </Link>
            {item.productVariant ? (
              <div className={styles.variant}>{item.productVariant.name}</div>
            ) : null}
          </div>
        </div>
      </td>
      <td>{getPrice}</td>
      <td>
        <div className={styles["quantity-wrapper"]}>
          <div>{getPrice}</div>
          <div className={styles.quantity}>
            <button
              className={styles.inc}
              onClick={() => handleUpdateItem(item.quantity - 1)}
            >
              -
            </button>
            {item.quantity}
            <button
              className={styles.desc}
              onClick={() => handleUpdateItem(item.quantity + 1)}
            >
              +
            </button>
          </div>
          <div>{item.quantity * getPrice}</div>
        </div>
      </td>
      <td>{item.quantity * getPrice}</td>
    </tr>
  );
});

const TableCart = () => {
  const { cart } = useSelector(cartSelector);

  return cart ? (
    <table className={styles["table-cart"]}>
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tổng</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((item: OrderItem) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </tbody>
    </table>
  ) : (
    <></>
  );
};

const CartResult = () => {
  const { total } = useSelector(cartSelector);
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
        Thanh toán
      </Link>
    </div>
  );
};

const EmptyCart = () => {
  return (
    <div className={styles.empty}>
      <div>
        <Image
          src={emptyCartPng}
          alt=""
          width={360}
          height={360}
          priority={true}
        />
      </div>
      <p>Giỏ hàng của bạn đang trống</p>
      <Link href={publicRoutes.products()}>Xem tất cả sản phẩm</Link>
    </div>
  );
};

const Cart = (props: Props) => {
  const { count, isSuccess } = useSelector(cartSelector);

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Giỏ hàng</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {isSuccess ? (
            count > 0 ? (
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
      </>
    </DefaultLayout>
  );
};

export default Cart;
