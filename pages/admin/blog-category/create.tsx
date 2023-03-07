import Head from "next/head";
import { DashboardPaper, BlogCategoryForm } from "../../../components";
import { AdminLayout } from "../../../layouts";

type Props = {};

const Page = (props: Props) => {
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
