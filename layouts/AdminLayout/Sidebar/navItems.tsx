import { ReactElement } from "react";
import { protectedRoutes, publicRoutes } from "@/utils/routes";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TableRowsIcon from "@mui/icons-material/TableRows";
import FeedIcon from "@mui/icons-material/Feed";
import DiscountIcon from "@mui/icons-material/Discount";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WebIcon from "@mui/icons-material/Web";
import LockResetIcon from "@mui/icons-material/LockReset";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export type NavItem = {
  id?: string;
  href: string;
  label: string;
  icon?: ReactElement;
  children?: NavItem[];
  tooltip?: string;
};

export const navItems: NavItem[] = [
  {
    href: protectedRoutes.admin,
    label: "Trang chủ",
    icon: <HomeIcon />,
    tooltip: "Trang chủ",
  },
  {
    href: publicRoutes.home,
    label: "Trang bán hàng",
    icon: <HomeIcon />,
    tooltip: "Trang bán hàng",
  },
  {
    href: protectedRoutes.userManagement,
    label: "Tài khoản",
    icon: <AccountBoxIcon />,
    tooltip: "Quản lý tài khoản",
  },
  {
    label: "Quản lý đơn hàng",
    icon: <TableRowsIcon />,
    id: "order",
    href: "",
    children: [
      {
        href: protectedRoutes.orderManagement,
        label: "Đơn hàng",
        icon: <LocalShippingIcon />,
        tooltip: "Quản lý đơn hàng",
      },
      {
        href: protectedRoutes.orderDiscountManagement,
        label: "Giảm giá đơn hàng",
        icon: <DiscountIcon />,
        tooltip: "Quản lý giảm giá đơn hàng",
      },
    ],
  },

  {
    label: "Quản lý sản phẩm",
    icon: <TableRowsIcon />,
    id: "product",
    href: "",
    children: [
      {
        href: protectedRoutes.groupProductManagement,
        label: "Nhóm sản phẩm",
        icon: <CategoryIcon />,
        tooltip: "Quản lý nhóm sản phẩm",
      },
      {
        href: protectedRoutes.productManagement,
        label: "Sản phẩm",
        icon: <Inventory2Icon />,
        tooltip: "Quản lý sản phẩm",
      },
      {
        href: protectedRoutes.commentProductManagement,
        label: "Đánh giá sản phẩm",
        icon: <ChatBubbleIcon />,
        tooltip: "Quản lý đánh giá sản phẩm",
      },
    ],
  },
  {
    label: "Quản lý bài viết",
    icon: <TableRowsIcon />,
    id: "blog",
    href: "",
    children: [
      {
        href: protectedRoutes.blogCategoryManagement,
        label: "Danh mục bài viết",
        icon: <CategoryIcon />,
        tooltip: "Quản lý danh mục bài viết",
      },
      {
        href: protectedRoutes.blog,
        label: "Bài viết",
        icon: <FeedIcon />,
        tooltip: "Quản lý bài viết",
      },
    ],
  },
  {
    href: protectedRoutes.advertisementManagement,
    label: "Quảng cáo",
    icon: <CampaignIcon />,
    tooltip: "Quản lý quảng cáo",
  },
  {
    href: "",
    label: "Cài đặt",
    icon: <SettingsIcon />,
    id: "setting",
    children: [
      {
        href: protectedRoutes.settingProfile,
        label: "Tài khoản",
        icon: <ManageAccountsIcon />,
        tooltip: "Cài đặt tài khoản",
      },
      {
        href: protectedRoutes.settingWebsite,
        label: "Website",
        icon: <WebIcon />,
        tooltip: "Cài đặt website",
      },
      {
        href: protectedRoutes.changePassword,
        label: "Đổi mật khẩu",
        icon: <LockResetIcon />,
        tooltip: "Đổi mật khẩu",
      },
    ],
  },
];
