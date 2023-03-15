import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, memo, useState } from "react";
import { confirmDialogActions } from "@/redux/slice/confirmDialogSlice";
import { useAppDispatch } from "@/redux/store";
import { VariantValue } from "@/utils/types";
import styles from "../_style.module.scss";

type Props = {
  src: string;
  onSelect: any;
  onDelete: any;
  hasSelectBtn: boolean;
  variantValues: VariantValue[];
  variantValueId: number | string | null;
  onSelectVariantValue: any;
};

const ImageItem = ({
  onSelect,
  onDelete,
  hasSelectBtn,
  variantValues,
  variantValueId,
  src,
  onSelectVariantValue,
}: Props) => {
  const appDispatch = useAppDispatch();
  const [value, setValue] = useState<string>("" + variantValueId);

  const handleOpen = (action: "select" | "delete") => {
    appDispatch(
      confirmDialogActions.show({
        text:
          action === "select"
            ? "Bạn có chắc chắn chọn ảnh này làm đại diện?"
            : "Bạn có chắc chắn xóa ảnh này?",
        onConfirm: () => (action === "select" ? onSelect() : onDelete()),
      })
    );
  };
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const _value = e.target.value;
    const variantValueId = _value === "" ? null : +_value;

    onSelectVariantValue(src, variantValueId);
    setValue(_value);
  };
  return (
    <>
      <div className={styles.imageItem}>
        <Image alt="" priority={true} width={160} height={180} src={src} />
        <div className={styles.variants}>
          Màu:&nbsp;
          <select onChange={handleChange} value={value}>
            <option>Chọn màu</option>
            {variantValues.map((variantValue: VariantValue) => (
              <option key={variantValue.id} value={variantValue.id}>
                {variantValue.value}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.imageImageBtns}>
          {hasSelectBtn ? (
            <Tooltip title="Chọn ảnh đại diện">
              <Button
                variant="contained"
                color="success"
                onClick={() => handleOpen("select")}
              >
                <CheckIcon />
              </Button>
            </Tooltip>
          ) : null}
          <Tooltip title="Xóa ảnh">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleOpen("delete")}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default memo(ImageItem);
