import { Rating } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  OrderItemModel,
  ProductVariantModel,
  VariantValueModel,
} from "../../../models";
import { authSelector } from "../../../redux/slice/authSlice";
import { cartActions } from "../../../redux/slice/cartSlice";
import {
  productDetailActions,
  productDetailSelector,
} from "../../../redux/slice/productDetailSlice";
import { useAppDispatch } from "../../../redux/store";
import { ButtonControl } from "../../common";
import styles from "../_style.module.scss";

type Props = {};

const Right = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { profile } = useSelector(authSelector);
  const {
    product,
    selectedVariantValues,
    selectedProductVariant,
    renderVariantValues,
  } = useSelector(productDetailSelector);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (selectedProductVariant) {
      if (profile.id > 0) {
        // Thêm vào giỏ hàng khi đã đăng nhập
        appDispatch(
          cartActions.fetchAddToCart({
            quantity,
            productVariantId: selectedProductVariant.id,
            price: selectedProductVariant.price,
          })
        );
      } else {
        // Thêm vào giỏ hàng lúc chưa đăng nhập
        appDispatch(
          cartActions.addToCart(
            new OrderItemModel({
              quantity,
              productVariantId: selectedProductVariant.id,
              price: selectedProductVariant.price,
              productVariant: new ProductVariantModel({
                ...JSON.parse(JSON.stringify(selectedProductVariant)),
                product: JSON.parse(JSON.stringify(product)),
              }),
            })
          )
        );
      }
    }
  };
  const changeQuantity = (newQuantity: number) => {
    newQuantity > 0 && setQuantity(newQuantity);
  };

  const handleClickVariantValue = (variantValue: VariantValueModel) => {
    appDispatch(productDetailActions.clickVariantValue(variantValue));
  };

  return product ? (
    <div className={styles.right}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.star}>
        <Rating value={product.star} readOnly />
      </div>
      <div className={styles.price}>
        {selectedProductVariant.id > 0 || !selectedProductVariant
          ? selectedProductVariant.price
          : product.rangePrice()}
        đ
      </div>
      {renderVariantValues.keys.map((key: string) => {
        return (
          <div className={styles["variant-type"]} key={key}>
            <div className={styles.title}>{key}</div>
            <ul className={styles.variant}>
              {renderVariantValues.values[key].map((variantValue) => {
                return (
                  <li
                    key={variantValue.id}
                    onClick={() => handleClickVariantValue(variantValue)}
                    className={
                      selectedVariantValues &&
                      selectedVariantValues.findIndex(
                        (i) => i.id === variantValue.id
                      ) !== -1
                        ? styles.active
                        : ""
                    }
                  >
                    {variantValue.value}
                  </li>
                );
              })}
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
        <ButtonControl color="secondary">Mua ngay</ButtonControl>
        <ButtonControl variant="outlined" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </ButtonControl>
      </div>
      <ul className={styles.description}>
        {product.description !== "" &&
          product
            .getDescription()
            .map((text: string, index: number) => <li key={index}>{text}</li>)}
      </ul>
    </div>
  ) : null;
};

export default Right;
