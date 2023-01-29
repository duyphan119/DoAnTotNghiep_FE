import { Rating } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cartActions } from "../../../redux/slice/cartSlice";
import {
  productDetailActions,
  productDetailSelector,
} from "../../../redux/slice/productDetailSlice";
import { useAppDispatch } from "../../../redux/store";
import { rangePrice } from "../../../utils/helpers";
import { VariantValue } from "../../../utils/types";
import styles from "../style.module.css";

type Props = {};

const Right = (props: Props) => {
  const appDispatch = useAppDispatch();
  const {
    product,
    selectedVariantValues,
    selectedProductVariant,
    renderVariantValues,
  } = useSelector(productDetailSelector);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (selectedProductVariant) {
      appDispatch(
        cartActions.fetchAddToCart({
          item: {
            quantity,
            productVariant: selectedProductVariant,
            productVariantId: selectedProductVariant.id,
          },
          price: selectedProductVariant.price,
        })
      );
    }
  };
  const changeQuantity = (newQuantity: number) => {
    newQuantity > 0 && setQuantity(newQuantity);
  };

  const handleClickVariantValue = (variantValue: VariantValue) => {
    appDispatch(productDetailActions.clickVariantValue(variantValue));
  };

  return product ? (
    <div className={styles.right}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.star}>
        <Rating value={product.star} readOnly />
      </div>
      <div className={styles.price}>
        {selectedProductVariant
          ? selectedProductVariant.price
          : rangePrice(product)}
        đ
      </div>
      {renderVariantValues.keys.map((key: string) => {
        return (
          <div className={styles["variant-type"]} key={key}>
            <div className={styles.title}>{key}</div>
            <ul className={styles.variant}>
              {renderVariantValues.values[key].map(
                (variantValue: VariantValue) => {
                  return (
                    <li
                      key={variantValue.id}
                      onClick={() => handleClickVariantValue(variantValue)}
                      className={
                        selectedVariantValues &&
                        selectedVariantValues.findIndex(
                          (i: VariantValue) => i.id === variantValue.id
                        ) !== -1
                          ? styles.active
                          : ""
                      }
                    >
                      {variantValue.value}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        );
      })}
      <div className={styles.quantity}>
        <button onClick={() => changeQuantity(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => changeQuantity(quantity + 1)}>+</button>
      </div>
      <div className={styles.buttons}>
        <button>Mua ngay</button>
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
      <ul className={styles.description}>
        {product.description.split("\n").map((text: string, index: number) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Right;
