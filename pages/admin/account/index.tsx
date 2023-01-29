import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../apis/user";
import { DataManagement } from "../../../components";
import { AdminLayout } from "../../../layouts";
import { COOKIE_ACCESSTOKEN_NAME, MSG_SUCCESS } from "../../../utils/constants";
import { formatDateTime } from "../../../utils/helpers";
import { ResponseItems, User } from "../../../utils/types";

type Props = {
  accountData: ResponseItems<User>;
};
const LIMIT = 10;
const Page = ({ accountData: propAccountData }: Props) => {
  const [accountData, setAccountData] =
    useState<ResponseItems<User>>(propAccountData);

  useEffect(() => {
    setAccountData(propAccountData);
  }, [propAccountData]);

  return (
    <AdminLayout pageTitle="Tài khoản">
      <>
        <Head>
          <title>Quản lý tài khoản</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DataManagement
          paperTitle="Danh sách tài khoản"
          sortBys={[
            {
              display: "Họ tên",
              value: "fullName",
            },
            {
              display: "Email",
              value: "email",
            },
            {
              display: "Số điện thoại",
              value: "phone",
            },
            {
              display: "Ngày tạo",
              value: "createdAt",
            },
          ]}
          rows={accountData.items}
          count={accountData.count}
          limit={LIMIT}
          hasCheck={true}
          columns={[
            {
              style: { width: 70, textAlign: "center" },
              display: "#",
              key: "index",
            },
            {
              style: { textAlign: "left" },
              key: "email",
              display: "Email",
            },
            {
              style: { textAlign: "left" },
              key: "fullName",
              display: "Họ tên",
            },
            {
              style: { textAlign: "center", width: 120 },
              key: "phone",
              display: "Số điện thoại",
            },
            {
              style: { width: 120, textAlign: "center" },
              key: "createdAt",
              display: "Ngày tạo",
              render: (row: User) => formatDateTime(row.createdAt),
            },
          ]}
        />
      </>
    </AdminLayout>
  );
};

export default Page;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { p, sortBy, sortType, q } = context.query as any;
    const params = {
      p: p || 1,
      limit: LIMIT,
      sortBy,
      sortType,
      withDeleted: true,
      q,
    };
    let { message, data } = await getAllUsers(
      context.req.cookies[COOKIE_ACCESSTOKEN_NAME],
      params
    );
    console.log({ message, data });
    if (message === MSG_SUCCESS)
      return {
        props: { accountData: data },
      };
  } catch (error) {
    console.log("GET ALL ACCOUNTS ERROR::", error);
  }
  return { notFound: true };
}
