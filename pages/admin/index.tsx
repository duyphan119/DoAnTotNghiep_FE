import { Grid, Paper, Typography, Box } from "@mui/material";
import Head from "next/head";
import React, { ReactElement, useState, useEffect, CSSProperties } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StarRateIcon from "@mui/icons-material/StarRate";
import Link from "next/link";

import { AdminLayout } from "../../layouts";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { formatDateTime, formatYAxisPrice } from "../../utils/helpers";
import styles from "../../styles/Dashboard.module.css";
import { getStatistics } from "../../apis/statistics";
import { MSG_SUCCESS } from "../../utils/constants";
import { BarChartData, Order } from "../../utils/types";
import Image from "next/image";
import { protectedRoutes } from "../../utils/routes";

type Props = {};

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
  data: BarChartData[];
  label: string;
};

type ChartProps = Partial<{
  tabs: ChartTab[];
}>;

type BestSellerProduct = {
  productId: number;
  productName: string;
  thumbnail: string;
  inventory: number;
  total: number;
};

type Statistics = {
  countUser: {
    currentMonth: number;
    lastMonth: number;
  };
  countOrder: {
    currentMonth: number;
    lastMonth: number;
  };
  countCommentProduct: {
    currentMonth: number;
    lastMonth: number;
  };
  revenue: {
    currentMonth: number;
    lastMonth: number;
  };
  listRevenueToday: BarChartData[];
  recentOrders: Order[];
  bestSellerProducts: BestSellerProduct[];
  listRevenueByYear: BarChartData[];
  listRevenueByMonth: BarChartData[];
};

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
      style={{
        backgroundColor: wrapperColor || "#fff",
        width: "calc(50% - 8px)",
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
          <YAxis tickFormatter={(value) => formatYAxisPrice(value)} />
          <Tooltip />
          <Legend />
          <Bar name="Doanh thu" dataKey="value" fill="var(--blue)" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const Dashboard = (props: Props) => {
  const [statisticsData, setStatisticsData] = useState<Statistics>({
    countUser: {
      currentMonth: 0,
      lastMonth: 0,
    },
    countOrder: {
      currentMonth: 0,
      lastMonth: 0,
    },
    countCommentProduct: {
      currentMonth: 0,
      lastMonth: 0,
    },
    revenue: {
      currentMonth: 0,
      lastMonth: 0,
    },
    listRevenueToday: [],
    recentOrders: [],
    bestSellerProducts: [],
    listRevenueByMonth: [],
    listRevenueByYear: [],
  });

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
        const { data, message } = await getStatistics();
        if (message === MSG_SUCCESS) {
          setStatisticsData(data);
        }
      } catch (error) {
        console.log("GET STATISTICS ERROR", error);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout pageTitle="Trang chủ">
      <>
        <Head>
          <title>Trang chủ</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={4}>
          <Box display="flex" flexWrap="wrap" gap="16px">
            <Widget
              title="Người dùng"
              value={countUser.currentMonth}
              oldValue={countUser.lastMonth}
              icon={<PersonAddAltIcon />}
              hrefViewMore={"/admin/account"}
            />
            <Widget
              title="Đơn hàng"
              value={countOrder.currentMonth}
              oldValue={countOrder.lastMonth}
              icon={<ReceiptIcon />}
              hrefViewMore={"/admin/order"}
            />
            <Widget
              title="Doanh thu"
              value={revenue.currentMonth}
              oldValue={revenue.lastMonth}
              icon={<AttachMoneyIcon />}
              hrefViewMore={"/admin/statistics"}
            />
            <Widget
              title="Đánh giá"
              value={countCommentProduct.currentMonth}
              oldValue={countCommentProduct.lastMonth}
              icon={<StarRateIcon />}
              iconColor="yellow"
              hrefViewMore={"/admin/comment-product"}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
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
                  <th style={{ textAlign: "left" }}>Họ tên</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: Order, index: number) => {
                  return (
                    <tr key={order.id}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{order.user.fullName}</td>
                      <td style={{ textAlign: "center", width: 200 }}>
                        {formatDateTime(order.orderDate)}
                      </td>
                      <td style={{ textAlign: "center", width: 160 }}>
                        <span
                          style={{
                            background: order.isPaid
                              ? "var(--green)"
                              : order.allowCannceled
                              ? "var(--blue)"
                              : "var(--gray)",
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
                {bestSellerProducts.map(
                  (item: BestSellerProduct, index: number) => {
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
                  }
                )}
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

export default Dashboard;
