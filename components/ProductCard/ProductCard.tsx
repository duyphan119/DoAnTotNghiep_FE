import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { formatProductVariants, rangePrice } from "../../utils/helpers";
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

const ProductCard = ({ product }: Props) => {
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
      product &&
      product.productVariants &&
      product.productVariants.length > 0
    ) {
      setVariants(formatProductVariants(product));
    }
  }, [product]);

  useEffect(() => {
    if (selected.length === variants.keys.length) {
      setSelectedProductVariant(
        product?.productVariants?.find((pv: ProductVariant) =>
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

  return product ? (
    <div className={styles.card}>
      <div className={styles["thumbnail-wrapper"]}>
        <Link
          className={styles.thumbnail}
          href={{
            pathname: "/product/[slug]",
            query: {
              slug: product.slug,
            },
          }}
        >
          <Image
            src={
              selected && product.images
                ? product.images.find(
                    (img: ProductVariantImage) =>
                      selected.findIndex(
                        (vv: VariantValue) => vv.id === img.variantValueId
                      ) !== -1
                  )?.path || product.thumbnail
                : product.thumbnail
            }
            alt=""
            priority={true}
            fill={true}
            sizes="(max-width: 768px) 1vw"
          />
        </Link>
        {/* <Downbar
          variants={variants}
          onAddToCart={handleAddToCart}
          onClickVariant={clickVariantValue}
          selected={selected}
        /> */}
        {product.star ? (
          <div className={styles.star}>
            <StarIcon className={styles.starIcon} />
            <span className={styles.starValue}>{product.star.toFixed(1)}</span>
          </div>
        ) : null}
      </div>
      <div className={styles["name-wrapper"]}>
        <Link
          href={{
            pathname: "/product/[slug]",
            query: {
              slug: product.slug,
            },
          }}
          className={styles.name + " three-dot three-dot-2"}
        >
          {product.name}
        </Link>
        {/* <WishlistIcon productId={product.id} /> */}
        {/* <div className={styles.star}>
          <Rating value={product.star} readOnly />
        </div> */}
        <div className={styles.price}>
          <span>
            {selectedProductVariant
              ? selectedProductVariant.price
              : rangePrice(product)}
            đ
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductCard;
