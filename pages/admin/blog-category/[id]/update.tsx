import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BlogCategoryForm, DashboardPaper } from "@/components";
import { AdminLayout } from "@/layouts";
import {
  blogCategoryActions,
  blogCategorySeletor,
} from "@/redux/slice/blogCategorySlice";
import { useAppDispatch } from "@/redux/store";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(blogCategorySeletor);

  useEffect(() => {
    if (!current) {
      appDispatch(blogCategoryActions.fetchGetById(+`${router.query.id}`));
    }
  }, [router.query.id, current]);

  return current.id > 0 ? (
    <AdminLayout pageTitle="Danh mục bài viết" profile={new UserModel(profile)}>
      <Head>
        <title>Thêm mới danh mục viết</title>
      </Head>
      <DashboardPaper title="Thông tin thêm mới danh mục bài viết">
        <BlogCategoryForm />
      </DashboardPaper>
    </AdminLayout>
  ) : (
    <></>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};

export default Page;
