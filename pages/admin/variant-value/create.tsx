import { DashboardPaper, VariantValueForm } from "@/components";
import { AdminLayout } from "@/layouts";
import { requireAdminProps } from "@/lib";
import { UserModel } from "@/models";
import { UserJson } from "@/types/json";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  return (
    <AdminLayout pageTitle="Thuộc tính" profile={new UserModel(profile)}>
      <Head>
        <title>Thêm mới thuộc tính</title>
      </Head>
      <DashboardPaper title="Thêm mới thuộc tính">
        <VariantValueForm />
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
