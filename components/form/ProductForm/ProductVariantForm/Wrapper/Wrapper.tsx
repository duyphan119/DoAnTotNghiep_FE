import { productVariantSelector } from "@/redux/slice/productVariantSlice";
import { memo } from "react";
import { useSelector } from "react-redux";
import TrItem from "../TrItem";
import styles from "../_style.module.scss";

type Props = {
  title?: string;
};

const Wrapper = ({ title }: Props) => {
  const { productVariants, inputs } = useSelector(productVariantSelector);

  return (
    <div className={styles.generatedSelectedWrapper}>
      <div className={styles.generatedSelectedTitle}>{title}</div>
      <table className={styles.generatedSelected}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Giá bán</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inputs && inputs.length > 0
            ? inputs.map((input, index) => <TrItem key={index} input={input} />)
            : null}
          {productVariants?.map((productVariant) => {
            return (
              <TrItem
                key={productVariant.id}
                input={productVariant}
                hasDeleteBtn={true}
                id={productVariant.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Wrapper);
