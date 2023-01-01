import React, { useState } from "react";
import styles from "../../style.module.css";

type Props = {
  quantity: number;
  changeQuantity: any;
};

const Quantity = (props: Props) => {
  return (
    <div className={styles.quantity}>
      <button
        className={styles.desc}
        onClick={() => props.changeQuantity(props.quantity - 1)}
      >
        -
      </button>
      <span>{props.quantity}</span>
      <button
        className={styles.inc}
        onClick={() => props.changeQuantity(props.quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default React.memo(Quantity);
