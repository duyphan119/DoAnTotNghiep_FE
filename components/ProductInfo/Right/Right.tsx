import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useCartContext } from "../../../context/CartContext";
import { useSocketContext } from "../../../context/SocketContext";
import { useProductDetailContext } from "../../../pages/product/[slug]";
import { formatProductVariants, rangePrice } from "../../../utils/helpers";
import { Product, ProductVariant, VariantValue } from "../../../utils/types";
import styles from "../style.module.css";

type Props = {
  selectedVariantValues?: VariantValue[];
  onClickVariantValue?: any;
};

const Right = ({ selectedVariantValues, onClickVariantValue }: Props) => {
  const { product } = useProductDetailContext();
  const { addToCart } = useCartContext();
  const { socket } = useSocketContext();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<ProductVariant>();
  const [variants, setVariants] = useState<any>({
    keys: [],
    values: {},
  });

  useEffect(() => {
    if (product) {
      setVariants(formatProductVariants(product));
      // socket.emit("join room", product.slug);
    }
  }, [product]);

  useEffect(() => {
    if (
      selectedVariantValues &&
      selectedVariantValues.length === variants.keys.length
    ) {
      setSelectedProductVariant(
        product?.productVariants?.find((pv: ProductVariant) =>
          pv.variantValues.every(
            (vv: VariantValue) =>
              selectedVariantValues &&
              selectedVariantValues.findIndex(
                (_vv: VariantValue) => vv.id === _vv.id
              ) !== -1
          )
        )
      );
    }
  }, [selectedVariantValues]);

  const handleAddToCart = () => {
    if (selectedProductVariant)
      addToCart(
        {
          quantity,
          productVariant: selectedProductVariant,
          productVariantId: selectedProductVariant.id,
        },
        selectedProductVariant.price
      );
  };
  const changeQuantity = (newQuantity: number) => {
    newQuantity > 0 && setQuantity(newQuantity);
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
      {variants.keys.map((key: string) => {
        return (
          <div className={styles["variant-type"]} key={key}>
            <div className={styles.title}>{key}</div>
            <ul className={styles.variant}>
              {variants.values[key].map((variantValue: VariantValue) => {
                return (
                  <li
                    key={variantValue.id}
                    onClick={() => onClickVariantValue(variantValue)}
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
      <ul className={styles.description}>
        {product.description.split("\n").map((text: string, index: number) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Right;
