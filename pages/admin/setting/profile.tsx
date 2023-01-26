import Head from "next/head";
import React from "react";
import { AdminLayout } from "../../../layouts";

type Props = {};

const Page = (props: Props) => {
  return (
    <AdminLayout pageTitle="Thông tin tài khoản">
      <>
        <Head>
          <title>Thông tin tài khoản</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
    </AdminLayout>
  );
};

export default Page;
