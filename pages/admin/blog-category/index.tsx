import { Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { ButtonControl, DataManagement, DataTable } from "../../../components";
import { AdminLayout } from "../../../layouts";
import {
  blogCategoryActions,
  blogCategorySeletor,
} from "../../../redux/slice/blogCategorySlice";
import { fetchSelector } from "../../../redux/slice/fetchSlice";
import { useAppDispatch } from "../../../redux/store";
import helper from "../../../utils/helpers";
import { protectedRoutes } from "../../../utils/routes";
import { BlogCategory } from "../../../utils/types";

type Props = {};

const LIMIT = 10;

const Page = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { blogCategoryData, openDialog, current } =
    useSelector(blogCategorySeletor);
  const { isLoading } = useSelector(fetchSelector);

  console.log("isLoading", isLoading);

  const handleDelete = () => {
    //
  };

  useEffect(() => {
    const { p, sortBy, sortType } = router.query;
    appDispatch(
      blogCategoryActions.fetchBlogCategoryData({
        p: +`${p}` || 1,
        ...(sortBy ? { sortBy: `${sortBy}` } : {}),
        ...(sortType ? { sortType: `${sortType}` } : {}),
        limit: LIMIT,
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
              render: (row: BlogCategory) =>
                helper.formatDateTime(row.createdAt),
            },
            {
              style: { width: 152 },
              key: "actions",
              render: (row: BlogCategory) => (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link href={protectedRoutes.updateBlogCategory(row.id)}>
                      <ButtonControl
                        color="secondary"
                        size="small"
                        onClick={() =>
                          appDispatch(blogCategoryActions.setCurrent(row))
                        }
                      >
                        Sửa
                      </ButtonControl>
                    </Link>
                    <ButtonControl
                      color="error"
                      onClick={() =>
                        appDispatch(blogCategoryActions.showDialog(row))
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
