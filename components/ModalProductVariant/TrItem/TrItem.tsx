import { IconButton } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { ProductVariant, VariantValue } from "../../../utils/types";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../style.module.css";
import ConfirmDialog from "../../ConfirmDialog";
import { deleteProductVariant } from "../../../apis/productvariant";
import { MSG_SUCCESS } from "../../../utils/constants";
import { Input, useModalProductVariantContext } from "../ModalProductVariant";
type Props = {
  hasDeleteBtn?: boolean;
  input: Input;
};

const TrItem = (props: Props) => {
  const { onDelete, onChange } = useModalProductVariantContext();
  // const NAME = props.productVariant
  //   ? props.productVariant.name
  //   : props.variantValues
  //       ?.map((variantValue: VariantValue) => variantValue.value)
  //       .join(" / ");
  // const [input, setInput] = useState<Input>(() =>
  //   props.productVariant
  //     ? {
  //         name: NAME || "",
  //         price: props.productVariant.price,
  //         inventory: props.productVariant.inventory,
  //       }
  //     : {
  //         name: NAME || "",
  //         price: 0,
  //         inventory: 0,
  //       }
  // );
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...props.input, [e.target.name]: +e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    // if (props.productVariant) {
    //   const { id } = props.productVariant;
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
      <td>{props.input.name}</td>
      <td>
        <input
          type="number"
          style={{ width: "80px" }}
          min={0}
          name="inventory"
          value={props.input.inventory}
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
          value={props.input.price}
          onChange={handleChange}
        />
      </td>
      <td>
        {props.hasDeleteBtn ? (
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
