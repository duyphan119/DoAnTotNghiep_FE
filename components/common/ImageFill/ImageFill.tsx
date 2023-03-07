import React from "react";
import Image from "next/image";
import styles from "./_style.module.scss";

type Props = {
  src: string;
} & Partial<{
  alt: string;
  height: string | number;
}>;

const ImageFill = ({ src, alt, height }: Props) => {
  if (src === "") return <></>;
  return (
    <div
      className={styles.wrapper}
      style={
        height
          ? {
              paddingBottom: height,
            }
          : {}
      }
    >
      <Image
        alt={alt || ""}
        priority={true}
        fill={true}
        sizes="(max-width: 768px) 100%"
        src={src}
        placeholder="blur"
        blurDataURL={src}
      />
    </div>
  );
};

export default ImageFill;
