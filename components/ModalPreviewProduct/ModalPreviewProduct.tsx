import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import { Modal, Box, Rating } from "@mui/material";
import {
  ProductVariant,
  ProductVariantImage,
  VariantValue,
} from "../../utils/types";
import { formatProductVariants, rangePrice } from "../../utils/helpers";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  productManagementActions,
  productManagementSelector,
} from "../../redux/slice/productManagementSlice";
import styles from "./_style.module.scss";

type Props = Partial<{}>;

const ModalPreviewProduct = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { openModalPreview, current: product } = useSelector(
    productManagementSelector
  );
  if (!product || !openModalPreview) return null;
  const [index, setIndex] = useState<number>(-1);
  const [selectedVariantValues, setSelectedVariantValues] = useState<
    VariantValue[]
  >([]);
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<ProductVariant>();
  const [variants, setVariants] = useState<any>({
    keys: [],
    values: {},
  });

  const clickVariantValue = (variantValue: VariantValue) => {
    const newArr = [...selectedVariantValues];
    const index = selectedVariantValues.findIndex(
      (i: VariantValue) =>
        i.variant &&
        variantValue.variant &&
        i.variant.name === variantValue.variant.name
    );
    if (index === -1) newArr.push(variantValue);
    else newArr[index] = variantValue;
    setSelectedVariantValues(newArr);
  };

  useEffect(() => {
    if (product) {
      setVariants(formatProductVariants(product));
    }
  }, [product]);

  console.log(variants);

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

  let images: ProductVariantImage[] = product.images || [];
  let imgSrc =
    images.length > 0 && index > -1 ? images[index].path : product.thumbnail;

  return (
    <Modal
      open={openModalPreview}
      onClose={() => appDispatch(productManagementActions.hideModalPreview())}
    >
      <Box
        bgcolor="#fff"
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: "translate(-50%, -50%)", maxWidth: "75vw" }}
      >
        <Box p={2}>
          <div className={styles.body}>
            <div className={styles.left}>
              <div className={styles.images} style={{ height: 548 }}>
                {images.map((image: ProductVariantImage, i: number) => {
                  return (
                    <Image
                      src={image.path}
                      key={image.id}
                      alt=""
                      width={52}
                      height={52}
                      priority={true}
                      onClick={() => setIndex(i)}
                    />
                  );
                })}
              </div>
              <Image
                src={imgSrc}
                alt=""
                width={480}
                height={548}
                priority={true}
              />
            </div>
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
                      {variants.values[key].map(
                        (variantValue: VariantValue) => {
                          return (
                            <li
                              key={variantValue.id}
                              onClick={() => clickVariantValue(variantValue)}
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
              {/* <div className={styles.quantity}>
        <button onClick={() => changeQuantity(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => changeQuantity(quantity + 1)}>+</button>
      </div>
      <div className={styles.buttons}>
        <button>Mua ngay</button>
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div> */}
            </div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ModalPreviewProduct);
