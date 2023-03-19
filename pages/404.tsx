import Head from "next/head";
import React from "react";
import { NotFound } from "@/components";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Head>
        <title>Không tìm thấy trang</title>
      </Head>
      <NotFound />
    </>
  );
};

export default Page;
