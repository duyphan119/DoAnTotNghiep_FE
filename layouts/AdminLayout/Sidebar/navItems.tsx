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
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PublicIcon from "@mui/icons-material/Public";
import BarChartIcon from "@mui/icons-material/BarChart";

export type NavItem = {
  id?: string;
  href: string;
  label: string;
  icon?: ReactElement;
  children?: NavItem[];
  tooltip?: string;
};
//["Tài khoản", "Loại thông báo", "Thông báo", "Đơn hàng", "Giảm giá đơn hàng", "Loại thuộc tính", "Thuộc tính", "Nhóm sản phẩm", "Sản phẩm", "Đánh giá sản phẩm", "Danh mục bài viết", "Bài viết", "Quảng cáo"].sort((a,b) => a > b ? 1 : a<b?-1:0)

//['Bài viết', 'Danh mục bài viết', 'Giảm giá đơn hàng', 'Loại thuộc tính', 'Loại thông báo', 'Nhóm sản phẩm', 'Quảng cáo', 'Sản phẩm', 'Thuộc tính', 'Thông báo', 'Tài khoản', 'Đánh giá sản phẩm', 'Đơn hàng']

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
    icon: <PublicIcon />,
    tooltip: "Trang bán hàng",
  },
  {
    href: "",
    label: "Quản lý",
    icon: <TableRowsIcon />,
    id: "management",
    children: [
      {
        href: protectedRoutes.blog,
        label: "Bài viết",
        icon: <FeedIcon />,
        tooltip: "Quản lý bài viết",
      },
      {
        href: protectedRoutes.blogCategoryManagement,
        label: "Danh mục bài viết",
        icon: <CategoryIcon />,
        tooltip: "Quản lý danh mục bài viết",
      },
      {
        href: protectedRoutes.commentProductManagement,
        label: "Đánh giá sản phẩm",
        icon: <ChatBubbleIcon />,
        tooltip: "Quản lý đánh giá sản phẩm",
      },
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
      {
        href: protectedRoutes.variantManagement,
        label: "Loại thuộc tính",
        icon: <WorkspacesIcon />,
        tooltip: "Quản lý loại thuộc tính",
      },
      {
        href: protectedRoutes.notificationTypeManagement,
        label: "Loại thông báo",
        icon: <CategoryIcon />,
        tooltip: "Quản lý loại thông báo",
      },
      {
        href: protectedRoutes.groupProductManagement,
        label: "Nhóm sản phẩm",
        icon: <CategoryIcon />,
        tooltip: "Quản lý nhóm sản phẩm",
      },
      {
        href: protectedRoutes.advertisementManagement,
        label: "Quảng cáo",
        icon: <CampaignIcon />,
        tooltip: "Quản lý quảng cáo",
      },
      {
        href: protectedRoutes.productManagement,
        label: "Sản phẩm",
        icon: <Inventory2Icon />,
        tooltip: "Quản lý sản phẩm",
      },
      {
        href: protectedRoutes.variantValueManagement,
        label: "Thuộc tính",
        icon: <ColorLensIcon />,
        tooltip: "Quản lý thuộc tính",
      },
      {
        href: protectedRoutes.notificationManagement,
        label: "Thông báo",
        icon: <NotificationsIcon />,
        tooltip: "Quản lý thông báo",
      },
      {
        href: protectedRoutes.userManagement,
        label: "Tài khoản",
        icon: <AccountBoxIcon />,
        tooltip: "Quản lý tài khoản",
      },
    ],
  },
  {
    href: publicRoutes.home,
    label: "Thống kê",
    icon: <BarChartIcon />,
    tooltip: "Trang thống kê",
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
