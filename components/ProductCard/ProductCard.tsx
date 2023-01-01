import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { formatProductVariants } from "../../utils/helpers";
import {
  Product,
  ProductVariant,
  ProductVariantImage,
  VariantValue,
} from "../../utils/types";
import Downbar from "./Downbar";
import styles from "./style.module.css";
import WishlistIcon from "./WishlistIcon";

type Props = {
  product?: Product;
};

const ProductCard = (props: Props) => {
  const { addToCart } = useCartContext();
  const [selected, setSelected] = useState<VariantValue[]>([]);
  const [variants, setVariants] = useState<any>({
    keys: [],
    values: {},
  });
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<ProductVariant>();
  useEffect(() => {
    if (
      props.product &&
      props.product.productVariants &&
      props.product.productVariants.length > 0
    ) {
      setVariants(formatProductVariants(props.product));
    }
  }, [props.product]);

  useEffect(() => {
    if (selected.length === variants.keys.length) {
      setSelectedProductVariant(
        props.product?.productVariants?.find((pv: ProductVariant) =>
          pv.variantValues.every(
            (vv: VariantValue) =>
              selected.findIndex((_vv: VariantValue) => vv.id === _vv.id) !== -1
          )
        )
      );
    }
  }, [selected]);

  const clickVariantValue = (variantValue: VariantValue) => {
    const newArr = [...selected];
    const index = selected.findIndex(
      (i: VariantValue) =>
        i.variant &&
        variantValue.variant &&
        i.variant.name === variantValue.variant.name
    );
    if (index === -1) newArr.push(variantValue);
    else newArr[index] = variantValue;
    setSelected(newArr);
  };

  const handleAddToCart = (quantity: number) => {
    if (props.product && selected.length === variants.keys.length) {
      const productVariant = props.product?.productVariants?.find(
        (pv: ProductVariant) =>
          pv.variantValues.every(
            (vv: VariantValue) =>
              selected.findIndex((_vv: VariantValue) => vv.id === _vv.id) !== -1
          )
      );

      if (productVariant) {
        addToCart({
          quantity,
          ...(props.product.productVariants && productVariant
            ? { productVariant, productVariantId: productVariant.id }
            : {}),
          productId: props.product.id,
          product: props.product,
        });
      }
    }
  };

  return props.product ? (
    <div className={styles.card}>
      <div className={styles["thumbnail-wrapper"]}>
        <Link
          className={styles.thumbnail}
          href={{
            pathname: "/product/[slug]",
            query: {
              slug: props.product.slug,
            },
          }}
        >
          <Image
            src={
              selected && props.product.images
                ? props.product.images.find(
                    (img: ProductVariantImage) =>
                      selected.findIndex(
                        (vv: VariantValue) => vv.id === img.variantValueId
                      ) !== -1
                  )?.path || props.product.thumbnail
                : props.product.thumbnail
            }
            alt=""
            priority={true}
            fill={true}
            sizes="(max-width: 768px) 1vw"
          />
        </Link>
        <Downbar
          variants={variants}
          onAddToCart={handleAddToCart}
          onClickVariant={clickVariantValue}
          selected={selected}
        />
      </div>
      <div className={styles["name-wrapper"]}>
        <Link
          href={{
            pathname: "/product/[slug]",
            query: {
              slug: props.product.slug,
            },
          }}
          className={styles.name}
        >
          {props.product.name}
        </Link>
        <WishlistIcon productId={props.product.id} />
        <div className={styles.price}>
          <span>
            {selectedProductVariant
              ? selectedProductVariant.price
              : props.product.minPrice === props.product.maxPrice
              ? props.product.minPrice
              : `${props.product.minPrice} - ${props.product.maxPrice}`}
            đ
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductCard;
