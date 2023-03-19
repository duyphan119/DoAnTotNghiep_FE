import { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { ProductModel } from "@/models";
import { publicRoutes } from "@/utils/routes";
import ImageFill from "../ImageFill";
import styles from "./_style.module.scss";

type Props = {
  product: ProductModel;
};

const ProductCard = ({ product }: Props) => {
  return product.id > 0 ? (
    <div className={styles.card}>
      <div className={styles["thumbnail-wrapper"]}>
        <Link
          className={styles.thumbnail}
          href={publicRoutes.productDetail(product.slug)}
        >
          <ImageFill src={product.thumbnail} alt="" height="133%" />
        </Link>
        {product.star ? (
          <div className={styles.star}>
            <StarIcon className={styles.starIcon} />
            <span className={styles.starValue}>{product.star.toFixed(1)}</span>
          </div>
        ) : null}
      </div>
      <div className={styles["name-wrapper"]}>
        <Link
          href={publicRoutes.productDetail(product.slug)}
          className={styles.name + " three-dot three-dot-2"}
        >
          {product.name}
        </Link>
        {/* <WishlistIcon productId={product.id} /> */}
        {/* <div className={styles.star}>
          <Rating value={product.star} readOnly />
        </div> */}
        <div className={styles.price}>
          <span>{product.rangePrice()}đ</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default memo(ProductCard);
