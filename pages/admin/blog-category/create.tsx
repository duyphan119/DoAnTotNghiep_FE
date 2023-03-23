import Head from "next/head";
import { DashboardPaper, BlogCategoryForm } from "@/components";
import { AdminLayout } from "@/layouts";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  return (
    <AdminLayout pageTitle="Danh mục bài viết" profile={new UserModel(profile)}>
      <Head>
        <title>Thêm mới danh mục viết</title>
      </Head>
      <DashboardPaper title="Thông tin thêm mới danh mục bài viết">
        <BlogCategoryForm />
      </DashboardPaper>
    </AdminLayout>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};

export default Page;
