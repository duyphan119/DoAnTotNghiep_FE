import Image from "next/image";
import React from "react";
import { ProductImageModel } from "../../../models";
import { ProductVariantImage } from "../../../utils/types";
import ImageFill from "../../common/ImageFill";
import styles from "../_style.module.scss";
type Props = {
  images: ProductImageModel[];
  thumbnail: string;
};

const Left = ({ images, thumbnail }: Props) => {
  const [index, setIndex] = React.useState<number>(-1);

  const src =
    index > -1 && images.length > index ? images[index].path : thumbnail;

  console.log("left re-render");

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
        <ImageFill src={src} alt="" height="133%" />
      </div>
    </div>
  );
};

export default Left;
