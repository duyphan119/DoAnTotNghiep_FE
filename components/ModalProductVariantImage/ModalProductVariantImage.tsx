import { useState, useEffect, ChangeEvent, ReactNode } from "react";
import { Modal, Typography, Box, Button, Grid, Tooltip } from "@mui/material";
import { Product, ProductVariantImage, Variant } from "../../utils/types";
import {
  createProductVariantImages,
  deleteProductVariantImage,
  getAllProductVariantImages,
  updateProductVariantImage,
} from "../../apis/productvariantimage";
import { MSG_SUCCESS } from "../../utils/constants";
import Image from "next/image";
import styles from "./style.module.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadMultiple, uploadSingle } from "../../apis/upload";
import { updateThumbnailProduct } from "../../apis/product";
import ConfirmDialog from "../ConfirmDialog";
import { ConfirmDialogProps } from "../ConfirmDialog/ConfirmDialog";
import { getAllVariants } from "../../apis/variant";

type Props = {
  open?: boolean;
  onClose?: any;
  product?: Product;
  onUpdateThumbnail?: any;
};

type ImageItemProps = {
  image: ProductVariantImage;
  onSelect: any;
  onDelete: any;
  hasSelectBtn: boolean;
  variants: Variant[];
  variantId: string;
};

const ImageItem = (props: ImageItemProps) => {
  const [propsConfirm, setPropsConfirm] = useState<ConfirmDialogProps>();
  const [value, setValue] = useState<string>("" + props.variantId);
  const handleClose = () => {
    setPropsConfirm({
      ...propsConfirm,
      open: false,
    });
  };
  const handleOpen = (action: "select" | "delete") => {
    setPropsConfirm({
      open: true,
      title:
        action === "select"
          ? "Bạn có chắc chắn chọn ảnh này làm đại diện?"
          : "Bạn có chắc chắn xóa ảnh này?",
      confirmText: "Có",
      cancelText: "Không",
      onClose: handleClose,
      onConfirm: action === "select" ? props.onSelect : props.onDelete,
    });
  };
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const _value = e.target.value;
    try {
      await updateProductVariantImage(
        props.image.id,
        _value === "" ? null : +_value
      );
      setValue(_value);
    } catch (error) {
      console.log("Update variant id error", error);
    }
  };
  return (
    <>
      {propsConfirm?.open ? <ConfirmDialog {...propsConfirm} /> : null}
      <div className={styles.imageItem}>
        <Image
          alt=""
          priority={true}
          width={160}
          height={180}
          src={props.image.path}
        />
        <div className={styles.variants}>
          Màu:&nbsp;
          <select onChange={handleChange} value={value}>
            <option>Chọn màu</option>
            {props.variants.map((variant: Variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.imageImageBtns}>
          {props.hasSelectBtn ? (
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

const ModalProductVariantImage = (props: Props) => {
  const [images, setImages] = useState<ProductVariantImage[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [thumbnail, setThumbnail] = useState<string>(
    props.product ? props.product.thumbnail || "" : ""
  );

  const handleSelect = async (path: string) => {
    try {
      if (props.product) {
        const { message } = await updateThumbnailProduct(
          props.product.id,
          path
        );

        if (message === MSG_SUCCESS) {
          setThumbnail(path);
          props.onUpdateThumbnail(props.product.id, path);
        }
      }
    } catch (error) {
      console.log("Update thumbnail product error", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { message } = await deleteProductVariantImage(id);
      if (message === MSG_SUCCESS) {
        setImages(
          [...images].filter((image: ProductVariantImage) => image.id !== id)
        );
      }
    } catch (error) {
      console.log("Delete product variant image error", error);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const _files = e.target.files;
      if (_files) {
        const promisesUpload = [];
        for (let i = 0; i < _files.length; i++) {
          const formData = new FormData();
          formData.append("image", _files[i]);
          promisesUpload.push(uploadSingle(formData));
        }
        const results: any = await Promise.all(promisesUpload);
        console.log(results);
        if (results.length > 0) {
          const { message: msg, data: imgs } = await createProductVariantImages(
            results.map((res: any) => ({
              productId: props.product?.id,
              path: res.data.secure_url,
            }))
          );
          if (msg === MSG_SUCCESS) {
            setImages([...imgs.items, ...images]);
          }
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.product) {
          const [re1, res2] = await Promise.allSettled([
            getAllProductVariantImages({
              productId: props.product.id,
            }),
            getAllVariants({ type: "Màu sắc" }),
          ]);
          if (re1.status === "fulfilled") {
            if (re1.value.message === MSG_SUCCESS) {
              setImages(re1.value.data.items);
            }
          }

          if (res2.status === "fulfilled") {
            if (res2.value.message === MSG_SUCCESS) {
              setVariants(res2.value.data.items);
            }
          }
        }
      } catch (error) {
        console.log("Fetch Image Error", error);
      }
    };
    fetchData();
  }, [props.product]);
  return props.product ? (
    <Modal open={props.open || false} onClose={props.onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          width: "50vw",
          padding: "16px",
        }}
      >
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Hình ảnh sản phẩm</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button component="label" variant="contained">
              Tải ảnh lên
              <input type="file" hidden multiple onChange={handleChange} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className={styles.images}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                {images.map((image: ProductVariantImage) => (
                  <Grid item xs={2} key={image.id}>
                    <ImageItem
                      image={image}
                      onSelect={() => handleSelect(image.path)}
                      onDelete={() => handleDelete(image.id)}
                      hasSelectBtn={image.path !== thumbnail}
                      variants={variants}
                      variantId={"" + image.variantValueId || ""}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  ) : null;
};

export default ModalProductVariantImage;
