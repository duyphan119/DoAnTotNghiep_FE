import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  deleteGroupProduct,
  restoreGroupProduct,
  softDeleteGroupProduct,
} from "../../../apis/groupProduct";
import { ConfirmDialog, DataManagement } from "../../../components";
import { AdminLayout } from "../../../layouts";
import {
  groupProductManagementActions,
  groupProductManagementSelector,
} from "../../../redux/slice/groupProductManagementSlice";
import { useAppDispatch } from "../../../redux/store";
import { formatDateTime } from "../../../utils/helpers";
import { protectedRoutes } from "../../../utils/routes";
import { GroupProduct } from "../../../utils/types";

type Props = {};
const LIMIT = 10;
const GroupProducts = (props: Props) => {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { groupProductData, current, openDialog } = useSelector(
    groupProductManagementSelector
  );

  console.log(groupProductData);

  const handleSoftDelete = (id: number) => {
    appDispatch(groupProductManagementActions.fetchSoftDeleteGroupProduct(id));
  };

  const handleRestore = (id: number) => {
    appDispatch(groupProductManagementActions.fetchRestoreGroupProduct(id));
  };

  const handleDelete = () => {
    if (current)
      appDispatch(
        groupProductManagementActions.fetchDeleteGroupProduct(current.id)
      );
  };

  useEffect(() => {
    const { p, sortBy, sortType } = router.query;
    appDispatch(
      groupProductManagementActions.fetchGroupProductData({
        p: +`${p}` || 1,
        limit: LIMIT,
        withDeleted: true,
        ...(sortBy ? { sortBy: `${sortBy}` } : {}),
        ...(sortType ? { sortType: `${sortType}` } : {}),
      })
    );
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Nhóm sản phẩm">
      <>
        <Head>
          <title>Quản lý nhóm sản phẩm</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DataManagement
          paperTitle="Danh sách nhóm sản phẩm"
          sortBys={[
            {
              display: "Tên",
              value: "name",
            },
            {
              display: "Bí danh",
              value: "slug",
            },
          ]}
          rows={groupProductData.items}
          count={groupProductData.count}
          limit={LIMIT}
          // hasCheck={true}
          columns={[
            {
              style: { width: 70, textAlign: "center" },
              display: "#",
              key: "index",
            },
            {
              style: { textAlign: "left" },
              key: "name",
              display: "Tên nhóm sản phẩm",
              render: (row: GroupProduct) => (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  {row.thumbnail ? (
                    <div>
                      <Image
                        alt=""
                        width={72}
                        height={72}
                        priority={true}
                        src={row.thumbnail}
                      />
                    </div>
                  ) : null}
                  {row.name}
                </div>
              ),
            },
            {
              style: { width: 90, textAlign: "center" },
              key: "sex",
              display: "Giới tính",
            },
            {
              style: { width: 90, textAlign: "center" },
              key: "isAdult",
              display: "Người lớn",
              render: (row: GroupProduct) =>
                row.isAdult ? (
                  <CheckIcon style={{ color: "#33eb91" }} />
                ) : (
                  <ClearIcon style={{ color: "#d32f2f" }} />
                ),
            },
            {
              style: { textAlign: "left" },
              key: "slug",
              display: "Bí danh",
            },
            {
              style: { width: 180, textAlign: "center" },
              key: "createdAt",
              display: "Ngày tạo",
              render: (row: GroupProduct) => formatDateTime(row.createdAt),
            },
            {
              style: { width: 90, textAlign: "center" },
              key: "deletedAt",
              display: "Hiển thị",
              render: (row: GroupProduct) =>
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
              style: { width: 100 },
              key: "actions",
              render: (row: GroupProduct) => (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link href={protectedRoutes.updateGroupProduct(row.id)}>
                      <button className="btnEdit">Sửa</button>
                    </Link>
                    <button
                      className="btnDelete"
                      style={{ marginLeft: "8px" }}
                      onClick={() =>
                        appDispatch(
                          groupProductManagementActions.showDialog(row)
                        )
                      }
                    >
                      Xóa
                    </button>
                  </div>
                  {openDialog && current ? (
                    <ConfirmDialog
                      open={current.id === row.id ? true : false}
                      onClose={() =>
                        appDispatch(groupProductManagementActions.hideDialog())
                      }
                      onConfirm={handleDelete}
                      title="Xác nhận"
                      text="Bạn có chắc chắn muốn xóa không?"
                    />
                  ) : null}
                </>
              ),
            },
          ]}
        />
      </>
    </AdminLayout>
  );
};

export default GroupProducts;
