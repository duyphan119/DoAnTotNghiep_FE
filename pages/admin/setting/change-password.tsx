import Head from "next/head";
import React from "react";
import { AdminFormPaper } from "../../../components";
import ChangePasswordForm from "../../../components/ChangePasswordForm";
import { AdminLayout } from "../../../layouts";

type Props = {};

const Page = (props: Props) => {
  return (
    <AdminLayout pageTitle="Đổi mật khẩu">
      <>
        <Head>
          <title>Đổi mật khẩu</title>
        </Head>
        <AdminFormPaper title="Thông tin">
          <ChangePasswordForm />
        </AdminFormPaper>
      </>
    </AdminLayout>
  );
};

export default Page;
