import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, memo, useState } from "react";
import { ConfirmDialog } from "../../../../../components";
import { ProductVariantModel } from "../../../../../models";
import { productVariantActions } from "../../../../../redux/slice/productVariantSlice";
import { useAppDispatch } from "../../../../../redux/store";
import styles from "../_style.module.scss";
type Props = {
  hasDeleteBtn?: boolean;
  input: ProductVariantModel;
  id?: number;
};

const TrItem = ({ input, hasDeleteBtn, id }: Props) => {
  const appDispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    appDispatch(
      productVariantActions.changeInput({
        ...input,
        [e.target.name]: +e.target.value,
      })
    );
  };

  return (
    <tr className={styles.generatedSelectedItem}>
      <td>{input.name}</td>
      <td>
        <input
          type="number"
          style={{ width: "80px" }}
          min={0}
          name="inventory"
          value={input.inventory}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="number"
          style={{ width: "120px" }}
          min={0}
          step={1000}
          name="price"
          value={input.price}
          onChange={handleChange}
        />
      </td>
      <td>
        {hasDeleteBtn ? (
          <>
            <span style={{ color: "#d32f2f", cursor: "pointer" }}>
              <DeleteIcon />
            </span>
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default memo(TrItem);
