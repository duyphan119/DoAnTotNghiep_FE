import { AdminLayout } from "@/layouts";
import { Fragment, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardPaper, NotificationTypeForm } from "@/components";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  notificationTypeActions,
  notificationTypeSelector,
} from "@/redux/slice/notificationTypeSlice";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page = ({ profile }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(notificationTypeSelector);

  useEffect(() => {
    router.query.id &&
      appDispatch(notificationTypeActions.fetchGetById(+`${router.query.id}`));
  }, [router.query.id]);

  return current.id > 0 ? (
    <AdminLayout pageTitle="Loại thông báo" profile={new UserModel(profile)}>
      <Fragment>
        <Head>
          <title>Cập nhật loại thông báo</title>
        </Head>
      </Fragment>
      <DashboardPaper title="Thông tin loại thông báo">
        <NotificationTypeForm />
      </DashboardPaper>
    </AdminLayout>
  ) : (
    <Fragment></Fragment>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};

export default Page;
