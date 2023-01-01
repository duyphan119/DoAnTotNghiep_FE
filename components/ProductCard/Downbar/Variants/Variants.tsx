import React, { useState } from "react";
import { Variant, VariantValue } from "../../../../utils/types";
import styles from "../../style.module.css";

type Props = {
  variants: any;
  selected: VariantValue[];
  clickVariant: any;
};

const Variants = (props: Props) => {
  return (
    <>
      {props.variants.keys.map((key: string) => {
        return (
          <div className={styles["variant-type"]} key={key}>
            <div className={styles["variant-type-name"]}>{key}</div>
            <ul className={styles.variants}>
              {props.variants.values[key].map((variantValue: VariantValue) => {
                return (
                  <li
                    className={
                      props.selected &&
                      props.selected.findIndex(
                        (i: any) => i.value === variantValue.value
                      ) !== -1
                        ? styles["variant-active"]
                        : styles.variant
                    }
                    key={variantValue.id}
                    onClick={() => props.clickVariant(variantValue)}
                  >
                    {variantValue.value}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(Variants);
