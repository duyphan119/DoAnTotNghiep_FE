import { StatisticsApi } from "@/api";
import { AdminLayout } from "@/layouts";
import { requireAdminProps } from "@/lib";
import { StatisticsModel, UserModel } from "@/models";
import styles from "@/styles/_Dashboard.module.scss";
import { UserJson } from "@/types/json";
import helper from "@/utils/helpers";
import { protectedRoutes } from "@/utils/routes";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";
import { ReactElement, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = { profile: UserJson | null };

type WidgetProps = Partial<{
  title: string;
  value: string | number;
  icon: ReactElement;
  iconColor: string;
  hrefViewMore: string;
  wrapperColor: string;
  oldValue: number;
}>;

type ChartTab = {
  data: {
    key: string;
    value: number;
  }[];
  label: string;
};

type ChartProps = Partial<{
  tabs: ChartTab[];
}>;

const sApi = new StatisticsApi();

const Widget = ({
  title,
  value,
  icon,
  iconColor,
  hrefViewMore,
  wrapperColor,
  oldValue,
}: WidgetProps) => {
  return (
    <Paper
      className={styles.widgetWrapper}
      sx={{
        backgroundColor: wrapperColor || "#fff",
        // width: {
        //   xs: "calc(100% - 8px)",
        //   sm: "calc(50% - 8px)",
        // },
        flex: 1,
        height: 192,
      }}
    >
      <div className={styles.widgetMain}>
        <div className={styles.widgetContent}>
          <div className={styles.widgetTitle}>{title}</div>
          <div
            className={`${styles.widgetValue} ${
              (oldValue || 0) > (value || 0)
                ? styles.widgetValueDown
                : styles.widgetValueUp
            }`}
          >
            {value}
          </div>
          <div className={styles.widgetOldValue}>Tháng trước: {oldValue}</div>
          {hrefViewMore ? (
            <div className={styles.widgetViewMore}>
              <Link href={hrefViewMore}>Xem thêm</Link>
            </div>
          ) : null}
        </div>
        <div
          style={{ color: iconColor || "#000" }}
          className={styles.widgetIcon}
        >
          {icon}
        </div>
      </div>
    </Paper>
  );
};

const Chart = ({ tabs }: ChartProps) => {
  const [tab, setTab] = useState<ChartTab | null>(null);
  const [label, setLabel] = useState<string>("");

  const handleClick = (chartTab: ChartTab) => {
    setTab(chartTab);
  };

  useEffect(() => {
    if (tabs && tabs.length > 0) {
      const item = tabs.find(({ data }: ChartTab) => data.length > 0);
      if (item) {
        setTab(item);
        setLabel(item.label);
      }
    }
  }, [tabs]);

  return (
    <Paper sx={{ height: 400, p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography>Doanh thu</Typography>
        <Box
          sx={{
            span: {
              fontSize: "12px",
              cursor: "pointer",
              background: "#f2f2f2",
              boxShadow: "0 0 1px 0px lightgray",
              padding: "5px 10px",
              "&.active": {
                background: "#455",
                color: "#fff",
              },
            },
          }}
        >
          {tabs?.map((tab: ChartTab) => {
            return (
              <span
                className={tab.label === label ? "active" : ""}
                onClick={() => handleClick(tab)}
                key={tab.label}
              >
                {tab.label}
              </span>
            );
          })}
        </Box>
      </Box>
      <ResponsiveContainer height="90%" width="100%">
        <BarChart data={tab ? tab.data : []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis tickFormatter={(value) => helper.formatYAxisPrice(value)} />
          <Tooltip />
          <Legend />
          <Bar name="Doanh thu" dataKey="value" fill="var(--blue)" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const Dashboard = ({ profile }: Props) => {
  const [statisticsData, setStatisticsData] = useState<StatisticsModel>(
    new StatisticsModel()
  );

  const {
    countUser,
    countOrder,
    countCommentProduct,
    revenue,
    listRevenueToday,
    recentOrders,
    bestSellerProducts,
    listRevenueByMonth,
    listRevenueByYear,
  } = statisticsData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sApi.getStatistics();
        setStatisticsData(data);
      } catch (error) {
        console.log("sApi.getStatistics error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout pageTitle="Trang chủ" profile={new UserModel(profile)}>
      <>
        <Head>
          <title>Trang chủ</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <Box display="flex" flexWrap="wrap" gap="16px">
            <Widget
              title="Người dùng"
              value={countUser.currentMonth}
              oldValue={countUser.lastMonth}
              icon={<PersonAddAltIcon />}
              hrefViewMore={protectedRoutes.userManagement}
            />
            <Widget
              title="Đơn hàng"
              value={countOrder.currentMonth}
              oldValue={countOrder.lastMonth}
              icon={<ReceiptIcon />}
              hrefViewMore={protectedRoutes.orderManagement}
            />
            <Widget
              title="Doanh thu"
              value={revenue.currentMonth}
              oldValue={revenue.lastMonth}
              icon={<AttachMoneyIcon />}
              hrefViewMore={protectedRoutes.statistics}
            />
            <Widget
              title="Đánh giá"
              value={countCommentProduct.currentMonth}
              oldValue={countCommentProduct.lastMonth}
              icon={<StarRateIcon />}
              iconColor="yellow"
              hrefViewMore={protectedRoutes.commentProductManagement}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Chart
            tabs={(() => {
              const date = new Date();
              return [
                {
                  label: "Hôm nay",
                  data: listRevenueToday,
                },
                {
                  label: `Tháng ${date.getMonth() + 1}`,
                  data: listRevenueByMonth,
                },
                {
                  label: `Năm ${date.getFullYear()}`,
                  data: listRevenueByYear,
                },
              ];
            })()}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ mb: 2 }}>Đơn hàng gần đây</Typography>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <td>Mã đơn hàng</td>
                  <th style={{ textAlign: "left" }}>Họ tên</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => {
                  return (
                    <tr key={order.id}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{order.code}</td>
                      <td>{order.user.fullName}</td>
                      <td style={{ textAlign: "center", width: 200 }}>
                        {helper.formatDateTime(order.orderDate)}
                      </td>
                      <td style={{ textAlign: "center", width: 160 }}>
                        <span
                          style={{
                            background: order.isPaid
                              ? "var(--green)"
                              : order.allowCannceled
                              ? "var(--blue)"
                              : "var(--purple)",
                          }}
                          className={styles.spanStatus}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.recentOrdersViewMore}>
              <Link href={protectedRoutes.orderManagement}>Xem thêm</Link>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography sx={{ mb: 2 }}>Sản phẩm bán chạy</Typography>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th style={{ textAlign: "left" }}>Sản phẩm</th>
                  <th>Đã bán</th>
                  <th>Tồn kho</th>
                </tr>
              </thead>
              <tbody>
                {bestSellerProducts.map((item, index) => {
                  return (
                    <tr key={item.productId}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Image
                            src={item.thumbnail}
                            alt=""
                            priority={true}
                            width={64}
                            height={74}
                          />
                          {item.productName}
                        </div>
                      </td>
                      <td style={{ textAlign: "center", width: 100 }}>
                        {item.total}
                      </td>
                      <td style={{ textAlign: "center", width: 100 }}>
                        {item.inventory}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.productVariantsViewMore}>
              <Link href={protectedRoutes.productManagement}>Xem thêm</Link>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};

export default Dashboard;
