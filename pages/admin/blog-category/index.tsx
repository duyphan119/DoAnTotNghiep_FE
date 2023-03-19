import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ButtonControl, DataManagement, DataTable } from "@/components";
import { AdminLayout } from "@/layouts";
import { BlogCategoryModel } from "@/models";
import {
  blogCategoryActions,
  blogCategorySeletor,
} from "@/redux/slice/blogCategorySlice";
import { confirmDialogActions } from "@/redux/slice/confirmDialogSlice";
import { useAppDispatch } from "@/redux/store";
import helper from "@/utils/helpers";
import { protectedRoutes } from "@/utils/routes";
import { useSelector } from "react-redux";

type Props = {};

const LIMIT = 10;

const Page = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { blogCategoryData } = useSelector(blogCategorySeletor);

  useEffect(() => {
    const { p, limit, sortBy, sortType } = router.query;
    appDispatch(
      blogCategoryActions.fetchGetAll({
        p: +`${p}` || 1,
        limit: limit ? `${limit}` : LIMIT,
        sortBy: `${sortBy || "id"}`,
        sortType: `${sortType}` === "asc" ? "asc" : "desc",
      })
    );
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Danh mục bài viết">
      <Head>
        <title>Quản lý danh mục bài viết</title>
      </Head>
      <DataManagement paperTitle="Danh sách danh mục bài viết">
        <DataTable
          rows={blogCategoryData.items}
          sortable={["id", "name", "slug", "sex", "isAdult", "createdAt"]}
          hasCheck={true}
          columns={[
            {
              style: { width: 70, textAlign: "center" },
              display: "ID",
              key: "id",
            },
            {
              style: { textAlign: "left" },
              key: "name",
              display: "Tên danh mục",
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
              render: (row: BlogCategoryModel) =>
                helper.formatDateTime(row.createdAt),
            },
            {
              style: { width: 152 },
              key: "actions",
              render: (row: BlogCategoryModel) => (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link href={protectedRoutes.updateBlogCategory(row.id)}>
                      <ButtonControl color="secondary" size="small">
                        Sửa
                      </ButtonControl>
                    </Link>
                    <ButtonControl
                      color="error"
                      onClick={() =>
                        appDispatch(
                          confirmDialogActions.show({
                            onConfirm: () => {
                              appDispatch(
                                blogCategoryActions.fetchSoftDeleteSingle(
                                  row.id
                                )
                              );
                            },
                          })
                        )
                      }
                      sx={{ ml: 1 }}
                      size="small"
                    >
                      Xóa
                    </ButtonControl>
                  </div>
                </>
              ),
            },
          ]}
        />
      </DataManagement>
    </AdminLayout>
  );
};

export default Page;
