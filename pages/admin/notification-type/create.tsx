import { AdminLayout } from "@/layouts";
import { Fragment } from "react";
import Head from "next/head";
import { DashboardPaper, NotificationTypeForm } from "@/components";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  return (
    <AdminLayout pageTitle="Loại thông báo" profile={new UserModel(profile)}>
      <Fragment>
        <Head>
          <title>Thêm mới loại thông báo</title>
        </Head>
      </Fragment>
      <DashboardPaper title="Thông tin thêm mới loại thông báo">
        <NotificationTypeForm />
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
