import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { cartSelector } from "@/redux/slice/cartSlice";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import styles from "./_style.module.scss";

type Props = {};

const TableCart = (props: Props) => {
  const { cart } = useSelector(cartSelector);

  return (
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
        {cart.items.map((item, index) => {
          return <CartItem key={index} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default TableCart;
