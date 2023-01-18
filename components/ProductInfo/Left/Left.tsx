import Image from "next/image";
import React from "react";
import { ProductVariantImage } from "../../../utils/types";
import styles from "../style.module.css";
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
      <Image
        src={index > -1 ? images[index].path : thumbnail}
        alt=""
        width={480}
        height={548}
        priority={true}
      />
    </div>
  );
};

export default Left;
