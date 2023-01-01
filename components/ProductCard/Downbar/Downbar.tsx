import React from "react";
import { Variant, VariantValue } from "../../../utils/types";
import styles from "../style.module.css";
import Quantity from "./Quantity";
import Variants from "./Variants";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Tooltip } from "@mui/material";
import { hasCookie } from "cookies-next";
import { COOKIE_ACCESSTOKEN_NAME } from "../../../utils/constants";
import { useSnackbarContext } from "../../../context/SnackbarContext";

type Props = {
  selected: VariantValue[];
  onAddToCart: any;
  onClickVariant: any;
  variants: any;
};

const Downbar = (props: Props) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const { show } = useSnackbarContext();

  const changeQuantity = (newQuantity: number) => {
    newQuantity >= 1 && setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (hasCookie(COOKIE_ACCESSTOKEN_NAME)) {
      props.onAddToCart(quantity);
    } else {
      show("Bạn cần đăng nhập để thực hiện thao tác này");
    }
  };

  return (
    <div className={styles.downbar}>
      <Variants
        variants={props.variants}
        selected={props.selected}
        clickVariant={props.onClickVariant}
      />
      <div className={styles.footer}>
        <Quantity quantity={quantity} changeQuantity={changeQuantity} />
        <Tooltip title="Thêm vào giỏ hàng">
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            <AddShoppingCartIcon style={{ fontSize: 20 }} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Downbar;
