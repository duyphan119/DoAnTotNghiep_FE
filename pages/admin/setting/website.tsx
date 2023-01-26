import Head from "next/head";
import React from "react";
import { AdminLayout } from "../../../layouts";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Head>
        <title>Cài đặt trang web</title>
      </Head>
      <AdminLayout pageTitle="Cài đặt trang web">
        <div>asd</div>
      </AdminLayout>
    </>
  );
};

export default Page;
