import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button, IconButton, Tooltip } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  deleteProduct,
  getAllProducts,
  restoreProduct,
  softDeleteProduct,
} from "../../../apis/product";
import {
  ConfirmDialog,
  DataManagement,
  ModalPreviewProduct,
  ModalProductVariant,
  ModalProductVariantImage,
} from "../../../components";
import { AdminLayout } from "../../../layouts";
import { MSG_SUCCESS } from "../../../utils/constants";
import { formatDateTime } from "../../../utils/helpers";
import { Product, ResponseItems } from "../../../utils/types";
import { useAppDispatch } from "../../../redux/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  productManagementActions,
  productManagementSelector,
} from "../../../redux/slice/productManagementSlice";
import { protectedRoutes } from "../../../utils/routes";

type Props = {};
const LIMIT = 10;
const Products = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const {
    current,
    openModalPV,
    openModalPVI,
    productData,
    openModalPreview,
    openDialog,
  } = useSelector(productManagementSelector);
  const handleCloseModalPV = () => {
    // setOpenModalPV(false);
  };
  const handleCloseModalPVI = () => {
    // setOpenModalPVI(false);
  };
  const handleOpenModalPVI = (row: Product) => {
    // setProduct(row);
    // setOpenModalPVI(true);
  };
  const handleOpenModalPV = (row: Product) => {
    // setProduct(row);
    // setOpenModalPV(true);
  };
  const handlePreview = async (row: Product) => {
    appDispatch(productManagementActions.showModalPreview(row));
    try {
      const { message, data } = await getAllProducts({
        slug: row.slug,
        group_product: true,
        product_variants: true,
        images: true,
      });
      if (message === MSG_SUCCESS) {
        appDispatch(productManagementActions.showModalPreview(data.items[0]));
      }
    } catch (error) {
      console.log("PREVIEW PRODUCT ERROR");
    }
  };
  const handleCloseModalPreview = () => {
    // setOpenModalPreview(false);
  };
  const handleUploadThumbnail = (id: number, thumbnail: string) => {
    // setProductData({
    //   ...productData,
    //   items: productData.items.map((p: Product) =>
    //     p.id === id ? { ...p, thumbnail } : p
    //   ),
    // });
  };

  const handleSoftDelete = async (id: number) => {
    // try {
    //   const { message } = await softDeleteProduct(id);
    //   if (message === MSG_SUCCESS) {
    //     const _productData = { ...productData };
    //     const index = _productData.items.findIndex((p: Product) => p.id === id);
    //     if (index !== -1) {
    //       _productData.items[index].deletedAt = "" + new Date().getTime();
    //       setProductData(_productData);
    //     }
    //   }
    // } catch (error) {
    //   console.log("Soft delete group product error", error);
    // }
  };

  const handleRestore = async (id: number) => {
    // try {
    //   const { message } = await restoreProduct(id);
    //   if (message === MSG_SUCCESS) {
    //     const _productData = { ...productData };
    //     const index = _productData.items.findIndex((p: Product) => p.id === id);
    //     if (index !== -1) {
    //       _productData.items[index].deletedAt = null;
    //       setProductData(_productData);
    //     }
    //   }
    // } catch (error) {
    //   console.log("Restore delete group product error", error);
    // }
  };

  const handleDelete = async () => {
    // try {
    //   if (current) {
    //     let { id } = current;
    //     const { message } = await deleteProduct(id);
    //     if (message === MSG_SUCCESS) {
    //       const _productData = { ...productData };
    //       _productData.items = _productData.items.filter(
    //         (gp: Product) => gp.id !== id
    //       );
    //       _productData.count -= 1;
    //       setProductData(_productData);
    //     }
    //   }
    // } catch (error) {
    //   console.log("Delete group product error", error);
    // }
  };

  useEffect(() => {
    const { p, sortBy, sortType } = router.query;

    appDispatch(
      productManagementActions.fetchProductData({
        p: +`${p}` || 1,
        ...(sortBy ? { sortBy: `${sortBy}` } : {}),
        ...(sortType ? { sortType: `${sortType}` } : {}),
        limit: LIMIT,
        withDeleted: true,
        group_product: true,
      })
    );
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Sản phẩm">
      <>
        <Head>
          <title>Quản lý sản phẩm</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DataManagement
          paperTitle="Danh sách sản phẩm"
          rows={productData.items}
          count={productData.count}
          limit={LIMIT}
          hasCheck={false}
          columns={[
            {
              style: { width: 70, textAlign: "center" },
              display: "#",
              key: "index",
            },
            {
              style: { textAlign: "left" },
              key: "name",
              display: "Tên sản phẩm",
              render: (row: Product) => (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div>
                    <Image
                      alt=""
                      width={72}
                      height={72}
                      priority={true}
                      src={row.thumbnail}
                    />
                  </div>
                  {row.name}
                </div>
              ),
            },
            {
              style: { textAlign: "left" },
              key: "slug",
              display: "Bí danh",
            },
            {
              style: { textAlign: "left", width: 200 },
              key: "groupProduct",
              display: "Nhóm sản phẩm",
              render: (row: Product) => row.groupProduct?.name,
            },
            {
              style: { textAlign: "center", width: 110 },
              key: "productVariantImages",
              display: "Hình ảnh",
              render: (row: Product) => (
                <Button
                  onClick={() =>
                    appDispatch(productManagementActions.showModalPVI(row))
                  }
                >
                  Thiết lập
                </Button>
              ),
            },
            {
              style: { textAlign: "center", width: 110 },
              key: "productVariants",
              display: "Biến thể",
              render: (row: Product) => (
                <Button
                  onClick={() =>
                    appDispatch(productManagementActions.showModalPV(row))
                  }
                >
                  Thiết lập
                </Button>
              ),
            },
            {
              style: { width: 120, textAlign: "center" },
              key: "createdAt",
              display: "Ngày tạo",
              render: (row: Product) => formatDateTime(row.createdAt),
            },
            {
              style: { width: 90, textAlign: "center" },
              key: "isVisible",
              display: "Hiển thị",
              render: (row: Product) =>
                row.deletedAt ? (
                  <ClearIcon
                    style={{ color: "#d32f2f" }}
                    onClick={() => handleRestore(row.id)}
                  />
                ) : (
                  <CheckIcon
                    style={{ color: "#33eb91" }}
                    onClick={() => handleSoftDelete(row.id)}
                  />
                ),
            },
            {
              style: { width: 80 },
              key: "actions",
              render: (row: Product) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Xem trước">
                    <IconButton
                      color="secondary"
                      onClick={() => handlePreview(row)}
                    >
                      <PreviewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sửa sản phẩm">
                    <Link href={protectedRoutes.updateProduct(row.id)}>
                      <IconButton color="warning">
                        <ModeEditIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Xóa sản phẩm">
                    <IconButton
                      color="error"
                      onClick={() =>
                        appDispatch(productManagementActions.showDialog(row))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {openDialog && current ? (
                    <ConfirmDialog
                      open={openDialog && current.id === row.id ? true : false}
                      onClose={() =>
                        appDispatch(productManagementActions.hideDialog())
                      }
                      onConfirm={handleDelete}
                      title="Xác nhận"
                      text="Bạn có chắc chắn muốn xóa không?"
                    />
                  ) : null}
                </div>
              ),
            },
          ]}
          sortable={["name", "slug", "groupProduct", "createdAt"]}
        />
        {openModalPVI ? (
          <ModalProductVariantImage onUpdateThumbnail={handleUploadThumbnail} />
        ) : null}
        {openModalPV ? <ModalProductVariant /> : null}
        {openModalPreview ? <ModalPreviewProduct /> : null}
      </>
    </AdminLayout>
  );
};

export default Products;

// export async function getServerSideProps(context: any) {
//   const { p, sortBy, sortType } = context.query;
//   const res = await getAllProducts({
//     p: p || 1,
//     limit: LIMIT,
//     sortBy,
//     sortType,
//     withDeleted: true,
//     group_product: true,
//   });
//   const { message, data } = res;
//   if (message === MSG_SUCCESS) return { props: { productData: data } };
//   return { notFound: true };
// }
