import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../ConfirmDialog";

import { ChangeEvent, useState } from "react";
import styles from "../style.module.css";
import { useModalProductVariantContext, Input } from "../ModalProductVariant";
type Props = {
  hasDeleteBtn?: boolean;
  input: Input;
};

const TrItem = ({ input, hasDeleteBtn }: Props) => {
  const { onDelete, onChange } = useModalProductVariantContext();
  // const NAME = productVariant
  //   ? productVariant.name
  //   : variantValues
  //       ?.map((variantValue: VariantValue) => variantValue.value)
  //       .join(" / ");
  // const [input, setInput] = useState<Input>(() =>
  //   productVariant
  //     ? {
  //         name: NAME || "",
  //         price: productVariant.price,
  //         inventory: productVariant.inventory,
  //       }
  //     : {
  //         name: NAME || "",
  //         price: 0,
  //         inventory: 0,
  //       }
  // );
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...input, [e.target.name]: +e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    // if (productVariant) {
    //   const { id } = productVariant;
    //   try {
    //     const { message } = await deleteProductVariant(id);
    //     if (message === MSG_SUCCESS) {
    //       onDelete(id);
    //     }
    //   } catch (error) {
    //     console.log("Delete product variant error", error);
    //   }
    // }
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

export default TrItem;
