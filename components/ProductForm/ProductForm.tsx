import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import {
  FooterForm,
  InputControl,
  SelectControl,
  TextAreaControl,
} from "../../components";
import { GroupProductModel, ProductImageModel } from "../../models";
import { fetchSelector } from "../../redux/slice/fetchSlice";
import { groupProductSelector } from "../../redux/slice/groupProductSlice";
import {
  productActions,
  productSelector,
} from "../../redux/slice/productSlice";
import { productVariantSelector } from "../../redux/slice/productVariantSlice";
import { snackbarActions } from "../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../redux/store";
import ProductVariantForm from "./ProductVariantForm";
import ProductVariantImageForm from "./ProductVariantImageForm";
type Props = {};

export type ProductInputs = {
  name: string;
  groupProductId: number;
  slug: string;
  description: string;
  detail: string;
  price: number;
  inventory: number;
  metaKeywords: string;
  metaDescription: string;
};

const ProductForm = (props: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { isLoading } = useSelector(fetchSelector);
  const { groupProductData } = useSelector(groupProductSelector);
  const { current } = useSelector(productSelector);
  const { inputs, productVariants } = useSelector(productVariantSelector);
  const [detail, setDetail] = useState<string>("");
  const [uploadResults, setUploadResults] = useState<any>([]);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [deletedImages, setDeletedImages] = useState<ProductImageModel[]>([]);
  const [deleteImages, setDeleteImages] = useState<number[]>([]);
  const [updateImages, setUpdateImages] = useState<
    Array<{ id: number; variantValueId: number | null }>
  >([]);

  useEffect(() => {
    setThumbnail(current ? current.thumbnail : "");
  }, [current]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ProductInputs>();
  const onSubmit: SubmitHandler<ProductInputs> = (data) => {
    if (!current || (current.id === 0 && uploadResults.length > 0)) {
      const reqData = {
        ...data,
        detail,
        productVariants: inputs,
        groupProductId: +data.groupProductId,
        images: uploadResults.map((result: any) => ({
          path: result.secure_url,
          variantValueId: result.variantValueId,
        })),
        thumbnail: thumbnail || uploadResults[0].secure_url,
      };

      if (reqData.images.find((item: any) => !item.variantValueId)) {
        appDispatch(
          snackbarActions.show({
            msg: "Có image variantValueId null",
            type: "error",
          })
        );
      } else {
        appDispatch(productActions.fetchCreate(reqData));
      }
    } else if (current) {
      appDispatch(
        productActions.fetchUpdate({
          ...data,
          detail,
          productVariants,
          groupProductId: +data.groupProductId,
          ...(thumbnail !== "" ? { thumbnail } : {}),
          newProductVariants: inputs,
          deleteImages,
          images: current.images,
          updateImages,
          id: current.id,
          newImages: uploadResults.map((result: any) => ({
            path: result.secure_url,
            variantValueId: result.variantValueId,
          })),
        })
      );
    }
  };

  useEffect(() => {
    if (current) {
      setValue("name", current.name);
      setValue("groupProductId", current.groupProductId);
      setValue("price", current.price);
      setValue("inventory", current.inventory);
      setValue("description", current.description);
      setValue("detail", current.detail);
    }
  }, [current]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <SelectControl
                label="Nhóm sản phẩm"
                register={register("groupProductId", {
                  required: {
                    value: true,
                    message: "Nhóm sản phẩm không được để trống",
                  },
                })}
                error={errors.groupProductId}
                required={true}
                options={groupProductData.items.map(
                  (item: GroupProductModel) => ({
                    value: item.id,
                    display: item.getFullName(),
                  })
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputControl
                required={true}
                register={register("name", {
                  required: {
                    value: true,
                    message: "Tên sản phẩm không được để trống",
                  },
                })}
                error={errors.name}
                label="Tên sản phẩm"
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={3}>
                <Grid item xs={12} md={6}>
                  <InputControl
                    type="number"
                    register={register("price")}
                    label="Giá bán"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputControl
                    type="number"
                    register={register("inventory")}
                    label="Số lượng"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextAreaControl
                register={register("description")}
                rows={6}
                label="Mô tả"
              />
            </Grid>
            <Grid item xs={12}>
              <ReactQuill theme="snow" value={detail} onChange={setDetail} />
            </Grid>
            <Grid item xs={12}>
              <InputControl
                register={register("metaKeywords")}
                label="Meta Từ khoá"
              />
            </Grid>
            <Grid item xs={12}>
              <TextAreaControl
                register={register("metaDescription")}
                rows={6}
                label="Meta Mô tả"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ProductVariantForm
            getPrice={() => +getValues("price")}
            getInventory={() => +getValues("inventory")}
          />
        </Grid>
        <Grid item xs={12}>
          <ProductVariantImageForm
            uploadResults={uploadResults}
            setUploadResults={setUploadResults}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
            deleteImages={deleteImages}
            setDeleteImages={setDeleteImages}
            updateImages={updateImages}
            setUpdateImages={setUpdateImages}
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm isLoading={isLoading} />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
