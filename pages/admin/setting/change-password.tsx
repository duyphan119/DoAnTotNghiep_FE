import Head from "next/head";
import React from "react";
import { DashboardPaper } from "../../../components";
import ChangePasswordForm from "../../../components/form/ChangePasswordForm";
import { AdminLayout } from "../../../layouts";

type Props = {};

const Page = (props: Props) => {
  return (
    <AdminLayout pageTitle="Đổi mật khẩu">
      <>
        <Head>
          <title>Đổi mật khẩu</title>
        </Head>
        <DashboardPaper title="Đổi mật khẩu">
          <ChangePasswordForm />
        </DashboardPaper>
      </>
    </AdminLayout>
  );
};

export default Page;
