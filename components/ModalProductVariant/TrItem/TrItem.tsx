import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../ConfirmDialog";
import { ChangeEvent, memo, useState } from "react";
import styles from "../_style.module.scss";
import { useAppDispatch } from "../../../redux/store";
import {
  productVariantActions,
  ProductVariantInput,
} from "../../../redux/slice/productVariantSlice";
import { ProductVariant } from "../../../utils/types";
type Props = {
  hasDeleteBtn?: boolean;
  input: ProductVariantInput;
  id?: number;
};

const TrItem = ({ input, hasDeleteBtn, id }: Props) => {
  const appDispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    appDispatch(
      productVariantActions.changeInput({
        ...input,
        [e.target.name]: +e.target.value,
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    if (id) appDispatch(productVariantActions.fetchDeleteProductVariant(id));
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
            <span
              style={{ color: "#d32f2f", cursor: "pointer" }}
              onClick={handleOpen}
            >
              <DeleteIcon />
            </span>
            <ConfirmDialog
              open={open}
              onClose={handleClose}
              title="Xác nhận"
              text="Bạn thật tự muốn xóa biến thể sản phẩm này?"
              onConfirm={handleConfirm}
            />
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default memo(TrItem);
