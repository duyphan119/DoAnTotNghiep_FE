import Image from "next/image";
import React from "react";
import { ProductVariantImage } from "../../../utils/types";
import styles from "../_style.module.scss";
type Props = {
  images: ProductVariantImage[];
  thumbnail: string;
};

const Left = ({ images, thumbnail }: Props) => {
  const [index, setIndex] = React.useState<number>(-1);
  return (
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
      <div className={styles.singleImageWrapper}>
        <div className={styles.singleImage}>
          <Image
            src={index > -1 ? images[index].path : thumbnail}
            alt=""
            fill={true}
            sizes="(min-width: 0) 480px"
          />
        </div>
      </div>
    </div>
  );
};

export default Left;
