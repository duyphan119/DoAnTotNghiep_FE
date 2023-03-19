import { OrderJson } from "@/types/json";
import OrderModel from "./OrderModel";

class StatisticsModel {
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
  listRevenueToday: {
    key: string;
    value: number;
  }[];
  recentOrders: OrderModel[];
  bestSellerProducts: {
    inventory: number;
    productId: number;
    productName: number;
    thumbnail: string;
    total: number;
  }[];
  listRevenueByMonth: {
    key: string;
    value: number;
  }[];
  listRevenueByYear: {
    key: string;
    value: number;
  }[];

  constructor(obj?: any) {
    this.countUser = obj?.countUser ?? {
      currentMonth: 0,
      lastMonth: 0,
    };
    this.countOrder = obj?.countOrder ?? {
      currentMonth: 0,
      lastMonth: 0,
    };
    this.countCommentProduct = obj?.countCommentProduct ?? {
      currentMonth: 0,
      lastMonth: 0,
    };
    this.revenue = obj?.revenue ?? {
      currentMonth: 0,
      lastMonth: 0,
    };
    this.listRevenueToday = obj?.listRevenueToday ?? [];
    this.recentOrders =
      obj?.recentOrders?.map((item: OrderJson) => new OrderModel(item)) ?? [];
    this.bestSellerProducts = obj?.bestSellerProducts ?? [];
    this.listRevenueByMonth = obj?.listRevenueByMonth ?? [];
    this.listRevenueByYear = obj?.listRevenueByYear ?? [];
  }
}

export default StatisticsModel;
