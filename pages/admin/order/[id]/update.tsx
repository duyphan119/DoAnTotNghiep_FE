import React, { useState, useMemo, FormEvent, useEffect } from "react";
import { AdminLayout } from "../../../../layouts";
import Head from "next/head";
import { getOrderById, updateStatus } from "../../../../apis/order";
import {
  COOKIE_ACCESSTOKEN_NAME,
  MSG_SUCCESS,
} from "../../../../utils/constants";
import { Order, OrderItem } from "../../../../utils/types";
import { Paper, Button, Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { DashboardPaper, FooterForm } from "../../../../components";
import { OrderItemModel, OrderModel } from "../../../../models";
import { useAppDispatch } from "../../../../redux/store";
import orderSlice, {
  orderActions,
  orderReducer,
  orderSelector,
} from "../../../../redux/slice/orderSlice";
import { useSelector } from "react-redux";
import { fetchSelector } from "../../../../redux/slice/fetchSlice";
type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { current } = useSelector(orderSelector);
  const { isLoading, reducer } = useSelector(fetchSelector);

  const getSubmitText = () => {
    const { allowCannceled, isPaid, isOrdered } = current;
    if (isOrdered) {
      if (allowCannceled && !isPaid) {
        return "Xác nhận đơn hàng";
      } else if (!allowCannceled && !isPaid) return "Xác nhận đã giao";
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    appDispatch(orderActions.fetchUpdateStatus(current.id));
  };

  useEffect(() => {
    const { id } = router.query;
    appDispatch(orderActions.fetchGetById(+`${id}`));
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Đơn hàng">
      <>
        <Head>
          <title>Cập nhật đơn hàng</title>
        </Head>
        <main>
          <form onSubmit={handleSubmit}>
            <DashboardPaper title="Thông tin đơn hàng">
              <Box>Mã đơn hàng {current.id}</Box>
              <Box>Họ tên: {current.fullName}</Box>
              <Box>Số điện thoại: {current.phone}</Box>
              <Box>Địa chỉ: {current.getFullAddress()}</Box>
              <Box>Trạng thái: {current.status}</Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center" }}
                  component="h6"
                >
                  Danh sách mặt hàng
                </Typography>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th style={{ textAlign: "left" }}>Sản phẩm</th>
                      <th style={{ width: 120 }}>Đơn giá</th>
                      <th style={{ width: 100 }}>Số lượng</th>
                      <th style={{ width: 120 }}>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.items.map(
                      (orderItem: OrderItemModel, index: number) => {
                        return (
                          <tr key={orderItem.id}>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td>
                              <Box display="flex" alignItems="center">
                                <Image
                                  width={80}
                                  height={88}
                                  alt=""
                                  src={orderItem.getThumbnail()}
                                  priority={true}
                                />
                                <Box ml={1}>
                                  <Typography variant="subtitle1">
                                    {orderItem.productVariant?.product?.name}
                                  </Typography>
                                  <Typography variant="caption">
                                    {orderItem.productVariant?.name}
                                  </Typography>
                                </Box>
                              </Box>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {orderItem.price}đ
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {orderItem.quantity}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {orderItem.getTotalPrice()}đ
                            </td>
                          </tr>
                        );
                      }
                    )}
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        Tổng
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {current.getCount()}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {current.getTotalPrice()}đ
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ marginLeft: "auto" }}>
                  <tbody>
                    <tr>
                      <td>Giá gốc&nbsp;</td>
                      <td style={{ textAlign: "right" }}>
                        {current.getTotalPrice()}đ
                      </td>
                    </tr>
                    {current.discount ? (
                      <tr>
                        <td>Giảm giá&nbsp;</td>
                        <td style={{ textAlign: "right", color: "red" }}>
                          {current.discount.value}đ
                        </td>
                      </tr>
                    ) : null}
                    <tr style={{ fontWeight: 600, fontSize: 18 }}>
                      <td>Tổng cộng&nbsp;</td>
                      <td style={{ textAlign: "right" }}>
                        {current.getTotalPrice() - current.discount.value}đ
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <FooterForm
                    submitText={getSubmitText()}
                    isLoading={
                      reducer === orderReducer.fetchUpdateStatus && isLoading
                    }
                  />
                </div>
              </Box>
            </DashboardPaper>
          </form>
        </main>
      </>
    </AdminLayout>
  );
};
export default Page;
