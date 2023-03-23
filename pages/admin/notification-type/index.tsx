import { ButtonControl, DataManagement, DataTable } from "@/components";
import { AdminLayout } from "@/layouts";
import { confirmDialogActions } from "@/redux/slice/confirmDialogSlice";
import {
  notificationTypeActions,
  notificationTypeSelector,
} from "@/redux/slice/notificationTypeSlice";
import { useAppDispatch } from "@/redux/store";
import helper from "@/utils/helpers";
import { protectedRoutes } from "@/utils/routes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserJson } from "@/types/json";
import { UserModel, NotificationTypeModel } from "@/models";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";

type Props = { profile: UserJson | null };

const LIMIT = 10;
const Page = ({ profile }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { notificationTypeData } = useSelector(notificationTypeSelector);

  useEffect(() => {
    const { p, sortBy, sortType } = router.query;
    appDispatch(
      notificationTypeActions.fetchGetAll({
        p: +`${p}` || 1,
        limit: LIMIT,
        sortBy: `${sortBy || "id"}`,
        sortType: `${sortType}` === "ASC" ? "ASC" : "DESC",
      })
    );
  }, []);

  return (
    <AdminLayout pageTitle="Loại thông báo" profile={new UserModel(profile)}>
      <Fragment>
        <Head>
          <title>Quản lý loại thông báo</title>
        </Head>
        <DataManagement paperTitle="Danh sách các loại thông báo">
          <DataTable
            rows={notificationTypeData.items}
            count={notificationTypeData.count}
            columns={[
              {
                style: { width: 40, textAlign: "center" },
                display: "ID",
                key: "id",
              },
              {
                style: { textAlign: "left" },
                key: "name",
                display: "Tên loại thông báo",
                render: (row: NotificationTypeModel) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    {row.icon !== "" ? (
                      <div>
                        <Image
                          alt=""
                          width={64}
                          height={64}
                          priority={true}
                          src={row.icon}
                        />
                      </div>
                    ) : null}
                    {row.name}
                  </div>
                ),
              },

              {
                style: { width: 160, textAlign: "center" },
                key: "createdAt",
                display: "Ngày tạo",
                render: (row: NotificationTypeModel) =>
                  helper.formatDateTime(row.createdAt),
              },
              {
                style: { width: 152 },
                key: "actions",
                render: (row: NotificationTypeModel) => (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link
                        href={protectedRoutes.updateNotificationType(row.id)}
                      >
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
                                  notificationTypeActions.fetchSoftDeleteSingle(
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
          />
        </DataManagement>
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
