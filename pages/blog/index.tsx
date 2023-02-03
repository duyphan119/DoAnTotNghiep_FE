import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import { DefaultLayout } from "../../layouts";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Head>
        <title>Danh sách bài viết</title>
      </Head>
      <DefaultLayout>
        <Container maxWidth="lg">lg</Container>
      </DefaultLayout>
    </>
  );
};

export default Page;
