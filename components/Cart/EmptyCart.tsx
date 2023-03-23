import { publicRoutes } from "@/utils/routes";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./_style.module.scss";
import { ButtonControl } from "../common";
import emptyCartPng from "@/public/empty-cart.png";

type Props = {};

const EmptyCart = (props: Props) => {
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
      <Link href={publicRoutes.products()}>
        <ButtonControl>Xem tất cả sản phẩm</ButtonControl>
      </Link>
    </div>
  );
};

export default EmptyCart;
