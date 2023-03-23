import { DashboardPaper, VariantValueForm } from "@/components";
import { AdminLayout } from "@/layouts";
import { requireAdminProps } from "@/lib";
import { UserModel } from "@/models";
import {
  variantValueActions,
  variantValueSelector,
} from "@/redux/slice/variantValueSlice";
import { useAppDispatch } from "@/redux/store";
import { UserJson } from "@/types/json";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { current } = useSelector(variantValueSelector);

  useEffect(() => {
    if (router.query.id) {
      appDispatch(variantValueActions.fetchGetById(+`${router.query.id}`));
    }
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Loại thuộc tính" profile={new UserModel(profile)}>
      <Head>
        <title>Cập nhật loại thuộc tính</title>
      </Head>
      <DashboardPaper title="Cập nhật loại thuộc tính">
        {current.id > 0 ? <VariantValueForm /> : null}
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
