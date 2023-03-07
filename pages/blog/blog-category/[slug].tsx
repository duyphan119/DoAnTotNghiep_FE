import React from "react";
import Head from "next/head";
import { DefaultLayout } from "../../../layouts";

type Props = {};

const Page = (props: Props) => {
  return (
    <DefaultLayout>
      <>
        <Head>
          <title>Danh mục bài viết</title>
        </Head>
      </>
    </DefaultLayout>
  );
};

export default Page;
