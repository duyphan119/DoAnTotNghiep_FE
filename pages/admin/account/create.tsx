import { AdminLayout } from "@/layouts";
import { requireAdminProps } from "@/lib";
import { UserModel } from "@/models";
import { UserJson } from "@/types/json";
import { GetServerSidePropsContext } from "next";
import { NextPage } from "next";
import { UserForm, DashboardPaper } from "@/components";
import Head from "next/head";

type Props = { profile: UserJson | null };

const Page: NextPage<Props> = ({ profile }) => {
  return (
    <AdminLayout pageTitle="Tạo tài khoản mới" profile={new UserModel(profile)}>
      <Head>
        <title>Tạo tài khoản mới</title>
      </Head>
      <DashboardPaper title="Thông tin tạo tài khoản mới">
        <UserForm />
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
