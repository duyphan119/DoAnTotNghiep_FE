import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import { DashboardPaper, DataManagement } from "../../../components";
import { AdminLayout } from "../../../layouts";
import { commentProductSelector } from "../../../redux/slice/commentProductSlice";

type Props = {};

const LIMIT = 10;

const Page = (props: Props) => {
  const { commentProductData } = useSelector(commentProductSelector);
  return (
    <AdminLayout pageTitle="Đánh giá sản phẩm">
      <>
        <Head>
          <title>Danh sách các bài đánh giá sản phẩm</title>
        </Head>
        <DataManagement
          count={commentProductData.count}
          hideCreateBtn={true}
          paperTitle="Các bài đánh giá sản phẩm"
          limit={LIMIT}
          sorts={[
            {
              label: "Ngày đăng tăng đần",
              sortBy: "createdAt",
              sortType: "asc",
            },
            {
              label: "Ngày đăng giảm đần",
              sortBy: "createdAt",
              sortType: "desc",
            },
          ]}
        ></DataManagement>
      </>
    </AdminLayout>
  );
};

export default Page;
