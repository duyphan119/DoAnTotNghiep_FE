import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BlogCategoryForm, DashboardPaper } from "../../../../components";
import { AdminLayout } from "../../../../layouts";
import {
  blogCategoryActions,
  blogCategorySeletor,
} from "../../../../redux/slice/blogCategorySlice";
import { useAppDispatch } from "../../../../redux/store";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(blogCategorySeletor);

  useEffect(() => {
    if (!current) {
      appDispatch(
        blogCategoryActions.fetchGetBlogCategoryById(+`${router.query.id}`)
      );
    }
  }, [router.query.id, current]);

  return (
    <AdminLayout pageTitle="Danh mục bài viết">
      <Head>
        <title>Thêm mới danh mục viết</title>
      </Head>
      <DashboardPaper title="Thông tin thêm mới danh mục bài viết">
        <BlogCategoryForm />
      </DashboardPaper>
    </AdminLayout>
  );
};

export default Page;
