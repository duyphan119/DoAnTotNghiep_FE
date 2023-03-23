import { requireAdminProps } from "@/lib";
import Head from "next/head";
import React from "react";
import { DashboardPaper, ChangePasswordForm } from "@/components";
import { AdminLayout } from "@/layouts";
import { GetServerSidePropsContext } from "next";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";

type Props = {
  profile: UserJson;
};

const Page = ({ profile }: Props) => {
  return (
    <AdminLayout pageTitle="Đổi mật khẩu" profile={new UserModel(profile)}>
      <Head>
        <title>Đổi mật khẩu</title>
      </Head>
      <DashboardPaper title="Đổi mật khẩu">
        <ChangePasswordForm />
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
