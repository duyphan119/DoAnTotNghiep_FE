import { NextPage } from "next/types";
import Head from "next/head";
import { Fragment } from "react";
import { AdminLayout } from "@/layouts";
import { DashboardPaper, OrderDiscountForm } from "@/components";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page: NextPage<Props> = ({ profile }) => {
  return (
    <AdminLayout
      pageTitle="Thêm mới giảm giá đơn hàng"
      profile={new UserModel(profile)}
    >
      <Fragment>
        <Head>
          <title>Thêm mới giảm giá đơn hàng</title>
        </Head>
        <DashboardPaper title="Thông tin thêm mới giảm giá đơn hàng">
          <OrderDiscountForm />
        </DashboardPaper>
      </Fragment>
    </AdminLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};
export default Page;
