import React, { useState } from "react";
import styles from "../../style.module.css";

type Props = {
  quantity: number;
  changeQuantity: any;
};

const Quantity = ({ quantity, changeQuantity }: Props) => {
  return (
    <div className={styles.quantity}>
      <button
        className={styles.desc}
        onClick={() => changeQuantity(quantity - 1)}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className={styles.inc}
        onClick={() => changeQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default React.memo(Quantity);
