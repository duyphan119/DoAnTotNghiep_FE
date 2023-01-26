import React, { useState, useMemo, FormEvent } from "react";
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
import { getThumbnailOrderItem } from "../../../../utils/helpers";
import { useRouter } from "next/router";
import { useSnackbarContext } from "../../../../context/SnackbarContext";
import { FooterForm } from "../../../../components";
type Props = {
  order: Order;
};

const EditOrder = ({ order }: Props) => {
  const router = useRouter();
  const { show } = useSnackbarContext();

  const total = useMemo(() => {
    const sumQuantity = order.items.reduce(
      (p: number, c: OrderItem) => p + c.quantity,
      0
    );
    const sumPrice = order.items.reduce(
      (p: number, c: OrderItem) => p + c.quantity * c.price,
      0
    );
    const price = sumPrice - (order.discount ? order.discount.value : 0);
    return { sumQuantity, sumPrice, price };
  }, []);

  const getSubmitText = () => {
    const { allowCannceled, isPaid, isOrdered } = order;
    console.log({ allowCannceled, isPaid, isOrdered });
    if (isOrdered) {
      if (allowCannceled && !isPaid) {
        return "Xác nhận đơn hàng";
      } else if (!allowCannceled && !isPaid) return "Xác nhận đã giao";
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { message } = await updateStatus(order.id, status);

      if (message === MSG_SUCCESS) {
        show("Cập nhật trạng thái đơn hàng thành công", "success");
        router.back();
      }
    } catch (error) {
      console.log("UPDATE ORDER STATUS ERROR", error);
    }
  };

  return (
    <AdminLayout pageTitle="Đơn hàng">
      <>
        <Head>
          <title>Cập nhật đơn hàng</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Paper
            sx={{ padding: "16px" }}
            component="form"
            onSubmit={handleSubmit}
          >
            <div
              style={{ fontSize: "2rem", fontWeight: "600", marginBottom: 16 }}
            >
              Thông tin đơn hàng
            </div>
            <Box>Mã đơn hàng {order.id}</Box>
            <Box>Họ tên: {order.fullName}</Box>
            <Box>Số điện thoại: {order.phone}</Box>
            <Box>
              Địa chỉ: {order.address},&nbsp;{order.ward},&nbsp;
              {order.district},&nbsp;{order.province}
            </Box>
            <Box>Trạng thái: {order.status}</Box>
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
                  {order.items.map((orderItem: OrderItem, index: number) => {
                    return (
                      <tr key={orderItem.id}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td>
                          <Box display="flex" alignItems="center">
                            <Image
                              width={80}
                              height={88}
                              alt=""
                              src={getThumbnailOrderItem(orderItem)}
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
                          {orderItem.quantity * orderItem.price}đ
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      Tổng
                    </td>
                    <td style={{ textAlign: "center" }}>{total.sumQuantity}</td>
                    <td style={{ textAlign: "center" }}>{total.sumPrice}đ</td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginLeft: "auto" }}>
                <tbody>
                  <tr>
                    <td>Giá gốc&nbsp;</td>
                    <td style={{ textAlign: "right" }}>{total.sumPrice}đ</td>
                  </tr>
                  {order.discount ? (
                    <tr>
                      <td>Giảm giá&nbsp;</td>
                      <td style={{ textAlign: "right", color: "red" }}>
                        {order.discount.value}đ
                      </td>
                    </tr>
                  ) : null}
                  <tr style={{ fontWeight: 600, fontSize: 18 }}>
                    <td>Tổng cộng&nbsp;</td>
                    <td style={{ textAlign: "right" }}>{total.price}đ</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <FooterForm
                  onBack={() => router.back()}
                  submitText={getSubmitText()}
                />
              </div>
            </Box>
          </Paper>
        </main>
      </>
    </AdminLayout>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const { message, data } = await getOrderById(
    +id,
    context.req.cookies[COOKIE_ACCESSTOKEN_NAME]
  );
  return message === MSG_SUCCESS && data.status
    ? {
        props: { order: data },
      }
    : {
        notFound: true,
      };
}

export default EditOrder;
