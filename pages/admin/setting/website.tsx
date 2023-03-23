import Head from "next/head";
import React from "react";
import { AdminLayout } from "@/layouts";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  return (
    <AdminLayout pageTitle="Cài đặt trang web" profile={new UserModel(profile)}>
      <Head>
        <title>Cài đặt trang web</title>
      </Head>
      <div>asd</div>
    </AdminLayout>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};

export default Page;
