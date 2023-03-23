import Head from "next/head";
import { NextPage } from "next/types";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { DashboardPaper, NotFound, OrderDiscountForm } from "@/components";
import { AdminLayout } from "@/layouts";
import { fetchSelector } from "@/redux/slice/fetchSlice";
import {
  orderDiscountReducer,
  orderDiscountSelector,
} from "@/redux/slice/orderDiscountSlice";
import { UserJson } from "@/types/json";
import { UserModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const Page: NextPage<Props> = ({ profile }) => {
  const { isSuccess, reducer } = useSelector(fetchSelector);
  const { current } = useSelector(orderDiscountSelector);

  const isNotFound = !(
    reducer === orderDiscountReducer.fetchGetById &&
    isSuccess &&
    current.id > 0
  );

  return isNotFound ? (
    <NotFound />
  ) : (
    <AdminLayout
      pageTitle="Cập nhật giảm giá đơn hàng"
      profile={new UserModel(profile)}
    >
      <Fragment>
        <Head>
          <title>Cập nhật giảm giá đơn hàng</title>
        </Head>
        <DashboardPaper title="Thông tin giảm giá đơn hàng">
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
