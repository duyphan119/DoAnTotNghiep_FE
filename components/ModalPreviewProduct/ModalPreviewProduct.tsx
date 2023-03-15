import { useState, useEffect, memo } from "react";
import Image from "next/image";
import { Modal, Box, Rating } from "@mui/material";
import {
  ProductVariant,
  ProductVariantImage,
  VariantValue,
} from "../../utils/types";
import helper from "../../utils/helpers";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  productActions,
  productSelector,
} from "../../redux/slice/productSlice";
import styles from "./_style.module.scss";
import { ProductImageModel, VariantValueModel } from "../../models";
import ImageFill from "../common/ImageFill";

type Props = Partial<{}>;

const ModalPreviewProduct = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { openModalPreview, current: product } = useSelector(productSelector);
  const [index, setIndex] = useState<number>(-1);
  const [selectedVariantValues, setSelectedVariantValues] = useState<
    VariantValueModel[]
  >([]);
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<ProductVariant>();
  const [variants, setVariants] = useState<{
    keys: string[];
    values: {
      [key: string]: VariantValueModel[];
    };
  }>({
    keys: [],
    values: {},
  });

  const clickVariantValue = (variantValue: VariantValueModel) => {
    const newArr = [...selectedVariantValues];
    const index = selectedVariantValues.findIndex(
      (i) =>
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
      setVariants(product.formatProductVariants());
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
  if (!product || !openModalPreview) return null;

  let images: ProductVariantImage[] = product.images || [];
  let imgSrc =
    images.length > 0 && index > -1 ? images[index].path : product.thumbnail;

  return (
    <Modal
      open={openModalPreview}
      onClose={() => appDispatch(productActions.hideModalPreview())}
    >
      <Box
        bgcolor="#fff"
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          minWidth: "50vw",
          maxWidth: "80vw",
        }}
      >
        <Box p={2}>
          <div className={styles.body}>
            <div className={styles.left}>
              <div className={styles.images} style={{ height: 496 }}>
                {images.map((image: ProductImageModel, i: number) => {
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
              <ImageFill src={imgSrc} alt="" height="133%" />
            </div>
            <div className={styles.right}>
              <div className={styles.name}>{product.name}</div>
              <div className={styles.star}>
                <Rating value={product.star} readOnly />
              </div>
              <div className={styles.price}>
                {selectedProductVariant
                  ? selectedProductVariant.price
                  : product.rangePrice()}
                đ
              </div>
              {variants.keys.map((key: string) => {
                return (
                  <div className={styles["variant-type"]} key={key}>
                    <div className={styles.title}>{key}</div>
                    <ul className={styles.variant}>
                      {variants.values[key].map(
                        (variantValue: VariantValueModel) => {
                          return (
                            <li
                              key={variantValue.id}
                              onClick={() => clickVariantValue(variantValue)}
                              className={
                                selectedVariantValues &&
                                selectedVariantValues.findIndex(
                                  (i: VariantValueModel) =>
                                    i.id === variantValue.id
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
            </div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ModalPreviewProduct);
