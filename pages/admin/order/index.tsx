import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ButtonControl, DataManagement, DataTable } from "../../../components";
import { AdminLayout } from "../../../layouts";
import { OrderModel } from "../../../models";
import { confirmDialogActions } from "../../../redux/slice/confirmDialogSlice";
import { orderActions, orderSelector } from "../../../redux/slice/orderSlice";
import { useAppDispatch } from "../../../redux/store";
import helper from "../../../utils/helpers";
import { protectedRoutes } from "../../../utils/routes";

type Props = {};
const LIMIT = 10;
const Orders = (props: Props) => {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { orderData } = useSelector(orderSelector);

  useEffect(() => {
    const { p, sortBy, sortType } = router.query;
    appDispatch(
      orderActions.fetchGetAll({
        p: +`${p}` || 1,
        limit: LIMIT,
        sortBy: `${sortBy || "id"}`,
        sortType: `${sortType}` === "asc" ? "asc" : "desc",
      })
    );
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Đơn hàng">
      <>
        <Head>
          <title>Quản lý đơn hàng</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DataManagement
          paperTitle="Danh sách đơn hàng"
          count={orderData.count}
          limit={LIMIT}
          hideCreateBtn={true}
        >
          <DataTable
            hasCheck={true}
            columns={[
              {
                style: { width: 70, textAlign: "center" },
                display: "ID",
                key: "id",
              },
              {
                style: { textAlign: "left" },
                key: "fullName",
                display: "Họ tên",
              },
              {
                style: { textAlign: "center" },
                key: "phone",
                display: "Số điện thoại",
              },
              {
                style: { width: 180, textAlign: "center" },
                key: "createdAt",
                display: "Ngày tạo",
                render: (row: any) => helper.formatDateTime(row.createdAt),
              },
              {
                style: { width: 180, textAlign: "center" },
                key: "status",
                display: "Trạng thái",
              },
              {
                style: { width: 100 },
                key: "actions",
                render: (row: OrderModel) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link href={protectedRoutes.updateOrder(row.id)}>
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
                                  orderActions.fetchSoftDeleteSingle(row.id)
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
            rows={orderData.items}
            sortable={[
              "id",
              "fullName",
              "phone",
              "createdAt",
              "status",
              "createdAt",
            ]}
          />
        </DataManagement>
      </>
    </AdminLayout>
  );
};

export default Orders;
