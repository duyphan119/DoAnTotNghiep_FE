import { Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductImageModel } from "../../../models";
import { productSelector } from "../../../redux/slice/productSlice";
import { variantSelector } from "../../../redux/slice/variantSlice";
import { ProductVariantImage } from "../../../utils/types";
import { ButtonControl } from "../../common";
import ImageItem from "./ImageItem";
import styles from "./_style.module.scss";
import { UploadApi } from "../../../api";

type Props = {
  uploadResults: any;
  setUploadResults: any;
  thumbnail: any;
  setThumbnail: any;
  deletedImages: ProductVariantImage[];
  setDeletedImages: any;
  deleteImages: number[];
  setDeleteImages: any;
  updateImages: Array<{ id: number; variantValueId: number | null }>;
  setUpdateImages: any;
};

const ProductVariantImageForm = ({
  setUploadResults,
  uploadResults,
  thumbnail,
  setThumbnail,
  deleteImages,
  setDeleteImages,
  updateImages,
  setUpdateImages,
}: Props) => {
  const { variantData } = useSelector(variantSelector);
  const { current: product } = useSelector(productSelector);
  const [files, setFiles] = useState<FileList | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleDelete = (path: string, id?: number) => {
    setUploadResults(
      [...uploadResults].map((item) => item.secure_url !== path)
    );
  };

  const handleDeleteImage = (id: number) => {
    setDeleteImages((images: number[]) => [...images, id]);
  };
  console.log(
    uploadResults.map((result: any) => ({
      path: result.secure_url,
      variantValueId: result.variantValueId,
    }))
  );
  const handleSelectVariantValue = (
    path: string,
    variantValueId: number | null
  ) => {
    if (!product || product.id === 0) {
      setUploadResults(
        [...uploadResults].map((item) =>
          item.secure_url === path ? { ...item, variantValueId } : { ...item }
        )
      );
    } else {
      const image =
        product && product.images
          ? product.images.find((image) => image.path === path)
          : null;

      if (image) {
        setUpdateImages(
          (images: Array<{ id: number; variantValueId: number | null }>) => {
            return [
              ...images.filter(
                (img: { id: number; variantValueId: number | null }) =>
                  img.id !== image.id
              ),
              { id: image.id, variantValueId },
            ];
          }
        );
      }
    }
  };

  useEffect(() => {
    if (files) {
      const upload = async () => {
        try {
          const uApi = new UploadApi();
          const results = await uApi.uploadMultiple(files);
          setUploadResults(results);
          setFiles(null);
        } catch (error) {}
      };

      upload();
    }
  }, [files]);

  return (
    <>
      <div>
        <ButtonControl
          component="label"
          variant="contained"
          isLoading={files ? true : false}
          startIcon={<FileUploadIcon />}
        >
          Tải ảnh lên
          <input type="file" hidden multiple onChange={handleChange} />
        </ButtonControl>
      </div>
      <div className={styles.images}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {product && product.images
            ? product.images.map((result: ProductImageModel) => {
                const path = result.path;
                const findUpdateImage = updateImages.find(
                  (image) => image.id === result.id
                );
                if (deleteImages.includes(result.id))
                  return <React.Fragment key={result.id}></React.Fragment>;
                return (
                  <Grid item xs={2} key={result.id}>
                    <ImageItem
                      variantValues={(() => {
                        const variant = variantData.items.find(
                          (item) => item.name === "Màu sắc"
                        );
                        return variant ? variant.variantValues : [];
                      })()}
                      src={path}
                      onSelect={() => setThumbnail(path)}
                      onDelete={() => handleDeleteImage(result.id)}
                      hasSelectBtn={path !== thumbnail}
                      variantValueId={
                        findUpdateImage
                          ? findUpdateImage.variantValueId
                          : result.variantValueId
                      }
                      onSelectVariantValue={handleSelectVariantValue}
                    />
                  </Grid>
                );
              })
            : null}
          {uploadResults.map((result: any) => {
            const path = result.secure_url;
            return (
              <Grid item xs={2} key={path}>
                <ImageItem
                  variantValues={(() => {
                    const variant = variantData.items.find(
                      (item) => item.name === "Màu sắc"
                    );
                    return variant ? variant.variantValues : [];
                  })()}
                  src={path}
                  onSelect={() => setThumbnail(path)}
                  onDelete={() => handleDelete(path)}
                  hasSelectBtn={path !== thumbnail}
                  variantValueId=""
                  onSelectVariantValue={handleSelectVariantValue}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default memo(ProductVariantImageForm);
