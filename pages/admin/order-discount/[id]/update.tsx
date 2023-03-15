import Head from "next/head";
import { NextPage } from "next/types";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  DashboardPaper,
  NotFound,
  OrderDiscountForm,
} from "../../../../components";
import { AdminLayout } from "../../../../layouts";
import { fetchSelector } from "../../../../redux/slice/fetchSlice";
import {
  orderDiscountReducer,
  orderDiscountSelector,
} from "../../../../redux/slice/orderDiscountSlice";

type Props = {};

const Page: NextPage = (props: Props) => {
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
    <AdminLayout pageTitle="Cập nhật giảm giá đơn hàng">
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

export default Page;
