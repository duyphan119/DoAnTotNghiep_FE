import { Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BlogContent, DashboardPaper } from "@/components";
import { AdminLayout } from "@/layouts";
import { blogActions, blogSelector } from "@/redux/slice/blogSlice";
import { useAppDispatch } from "@/redux/store";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(blogSelector);

  useEffect(() => {
    const { id } = router.query;
    appDispatch(blogActions.fetchGetById(+`${id}`));
  }, [router.query]);

  return (
    <AdminLayout
      pageTitle="Chỉnh sửa bài viết"
      profile={new UserModel(profile)}
    >
      <>
        <Head>
          <title>Chỉnh sửa bài viết</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <DashboardPaper title="Xem trước bài viết">
          {!current ? (
            <div>Không tìm thấy bài viết</div>
          ) : (
            <BlogContent blog={current} />
          )}
        </DashboardPaper>
      </>
    </AdminLayout>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};
export default Page;
