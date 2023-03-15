import { NextPage } from "next/types";
import { Avatar, Box, Divider, Rating } from "@mui/material";
import moment from "moment";
import "moment/locale/vi";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { AdminLayout } from "../../../layouts";
import { ButtonControl, DataManagement, DataTable } from "../../../components";
import { useAppDispatch } from "../../../redux/store";
import {
  orderDiscountActions,
  orderDiscountSelector,
} from "../../../redux/slice/orderDiscountSlice";
import helper from "../../../utils/helpers";
import { OrderDiscountModel } from "../../../models";
import { protectedRoutes } from "../../../utils/routes";
import { confirmDialogActions } from "../../../redux/slice/confirmDialogSlice";

type Props = {};

const LIMIT = 10;
const Page: NextPage = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const { orderDiscountData } = useSelector(orderDiscountSelector);

  useEffect(() => {
    const { p, sortBy, sortType } = router.query;
    appDispatch(
      orderDiscountActions.fetchGetAll({
        p: +`${p}` || 1,
        limit: LIMIT,
        sortBy: `${sortBy || "id"}`,
        sortType: `${sortType}` === "asc" ? "asc" : "desc",
      })
    );
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Giảm giá đơn hàng">
      <Fragment>
        <Head>
          <title>Quản lý giảm giá đơn hàng</title>
        </Head>
        <DataManagement
          paperTitle="Danh sách giảm giá đơn hàng"
          count={orderDiscountData.count}
          limit={LIMIT}
        >
          <DataTable
            rows={orderDiscountData.items}
            hasCheck={true}
            columns={[
              {
                style: { width: 70, textAlign: "center" },
                display: "ID",
                key: "id",
              },
              {
                style: { width: 140, textAlign: "center" },
                key: "code",
                display: "Mã giảm giá",
              },
              {
                style: { textAlign: "center" },
                key: "minPrice",
                display: "Giá tối thiểu",
                render: (row: OrderDiscountModel) => `${row.minPrice}đ`,
              },
              {
                style: { textAlign: "center" },
                key: "value",
                display: "Giảm",
                render: (row: OrderDiscountModel) => row.displayValue(),
              },
              {
                style: { width: 120, textAlign: "center" },
                key: "start",
                display: "Bắt đầu",
                render: (row: OrderDiscountModel) =>
                  helper.formatDateTime(row.start),
              },
              {
                style: { width: 120, textAlign: "center" },
                key: "end",
                display: "Kết thúc",
                render: (row: OrderDiscountModel) =>
                  helper.formatDateTime(row.end),
              },
              {
                style: { width: 120, textAlign: "center" },
                key: "createdAt",
                display: "Ngày tạo",
                render: (row: OrderDiscountModel) =>
                  helper.formatDateTime(row.createdAt),
              },
              {
                style: { width: 100 },
                key: "actions",
                render: (row: OrderDiscountModel) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link href={protectedRoutes.updateOrderDiscount(row.id)}>
                        <ButtonControl color="secondary" size="small">
                          Sửa
                        </ButtonControl>
                      </Link>
                      <ButtonControl
                        color="error"
                        onClick={() =>
                          appDispatch(
                            confirmDialogActions.show({
                              onConfirm: () => {
                                appDispatch(
                                  orderDiscountActions.fetchSoftDeleteSingle(
                                    row.id
                                  )
                                );
                              },
                            })
                          )
                        }
                        sx={{ ml: 1 }}
                        size="small"
                      >
                        Xóa
                      </ButtonControl>
                    </div>
                  </>
                ),
              },
            ]}
            sortable={[
              "id",
              "code",
              "minValue",
              "value",
              "start",
              "end",
              "createdAt",
            ]}
          />
        </DataManagement>
      </Fragment>
    </AdminLayout>
  );
};

export default Page;
