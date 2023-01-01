import React from "react";
import { useCartContext } from "../../../context/CartContext";
import { formatProductVariants } from "../../../utils/helpers";
import {
  Product,
  ProductVariant,
  Variant,
  VariantValue,
} from "../../../utils/types";
import styles from "../style.module.css";

type Props = {
  product?: Product;
  selectedVariantValues?: VariantValue[];
  onClickVariantValue?: any;
};

const Right = (props: Props) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = React.useState<number>(1);
  const [selectedProductVariant, setSelectedProductVariant] =
    React.useState<ProductVariant>();
  const [variants, setVariants] = React.useState<any>({
    keys: [],
    values: {},
  });

  React.useEffect(() => {
    if (props.product) {
      setVariants(formatProductVariants(props.product));
    }
  }, [props.product]);

  React.useEffect(() => {
    if (
      props.selectedVariantValues &&
      props.selectedVariantValues.length === variants.keys.length
    ) {
      setSelectedProductVariant(
        props.product?.productVariants?.find((pv: ProductVariant) =>
          pv.variantValues.every(
            (vv: VariantValue) =>
              props.selectedVariantValues &&
              props.selectedVariantValues.findIndex(
                (_vv: VariantValue) => vv.id === _vv.id
              ) !== -1
          )
        )
      );
    }
  }, [props.selectedVariantValues]);

  const handleAddToCart = () => {
    if (selectedProductVariant)
      addToCart({
        quantity,
        productVariant: selectedProductVariant,
        productVariantId: selectedProductVariant.id,
      });
  };
  const changeQuantity = (newQuantity: number) => {
    newQuantity > 0 && setQuantity(newQuantity);
  };
  return props.product ? (
    <div className={styles.right}>
      <div className={styles.name}>{props.product.name}</div>
      <div className={styles.price}>
        99000đ
        {/* <span>{props.product.productVariants[0].price}</span> */}
      </div>
      {variants.keys.map((key: string) => {
        return (
          <div className={styles["variant-type"]} key={key}>
            <div className={styles.title}>{key}</div>
            <ul className={styles.variant}>
              {variants.values[key].map((variantValue: VariantValue) => {
                return (
                  <li
                    key={variantValue.id}
                    onClick={() => props.onClickVariantValue(variantValue)}
                    className={
                      props.selectedVariantValues &&
                      props.selectedVariantValues.findIndex(
                        (i: VariantValue) => i.id === variantValue.id
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
        <button>Mua ngay</button>
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  ) : null;
};

export default Right;
