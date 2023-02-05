import Link from "next/link";
import Image from "next/image";
import React, { ReactElement } from "react";
import { Box, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TableRowsIcon from "@mui/icons-material/TableRows";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FeedIcon from "@mui/icons-material/Feed";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WebIcon from "@mui/icons-material/Web";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useRouter } from "next/router";

import styles from "./style.module.css";
import { protectedRoutes } from "../../../utils/routes";
import logoPng from "../../../public/logo.png";

type Props = Partial<{
  open: boolean;
}>;

type NavItem = {
  id?: string;
  href: string;
  label: string;
  icon?: ReactElement;
  children?: NavItem[];
  tooltip?: string;
};

const navItems: NavItem[] = [
  {
    href: protectedRoutes.admin,
    label: "Trang chủ",
    icon: <HomeIcon />,
    tooltip: "Trang chủ",
  },
  {
    href: protectedRoutes.userManagement,
    label: "Tài khoản",
    icon: <AccountBoxIcon />,
    tooltip: "Quản lý tài khoản",
  },
  {
    href: protectedRoutes.orderManagement,
    label: "Đơn hàng",
    icon: <LocalShippingIcon />,
    tooltip: "Quản lý đơn hàng",
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
    ],
  },
  {
    href: protectedRoutes.blogManagement,
    label: "Bài viết",
    icon: <FeedIcon />,
    tooltip: "Quản lý bài viết",
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

const Sidebar = ({ open }: Props) => {
  const router = useRouter();
  return (
    <Box
      component="aside"
      className={styles.sidebar}
      sx={{
        width: {
          xs: "60px",
          xl: open ? "320px" : "60px",
        },
        ".logoText": {
          display: {
            xs: "none",
            xl: open ? "initial" : "none",
          },
        },
      }}
    >
      <Link className={styles.logo} href={protectedRoutes.admin}>
        <Image
          src={logoPng}
          alt="Logo"
          width={56}
          height={56}
          priority={true}
        />
        <span className="logoText">SHOP</span>
      </Link>
      <Box
        component="nav"
        className={styles.nav}
        sx={{
          ".navItemLinkLabel": {
            display: {
              xs: "none",
              xl: open ? "initial" : "none",
            },
          },
          ".navItemHasMenu": {
            display: {
              xs: "none",
              xl: open ? "flex" : "none",
            },
          },
          ".navMenu": {
            padding: {
              xl: open ? "0 16px" : 0,
              xs: "0",
            },
          },
        }}
      >
        <ul className={styles.navItems}>
          {navItems.map((navItem: NavItem) => (
            <li className={styles.navItem} key={navItem.label}>
              {navItem.children ? (
                <>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    id={navItem.id}
                    hidden
                    defaultChecked={
                      navItem.children.findIndex(
                        (navItem1: NavItem) => navItem1.href === router.pathname
                      ) !== -1
                    }
                  />
                  <label
                    htmlFor={navItem.id}
                    className={"navItemHasMenu " + styles.hasMenu}
                  >
                    {navItem.icon}
                    <span className="navItemLinkLabel"> {navItem.label}</span>
                    <KeyboardArrowDownIcon className={styles.closeMenuIcon} />
                    <KeyboardArrowLeftIcon className={styles.openMenuIcon} />
                  </label>
                  <ul className={"navMenu " + styles.navMenu}>
                    {navItem.children.map((navItem2: NavItem) => {
                      let className =
                        styles.navLink +
                        (router.pathname === navItem2.href
                          ? " " + styles.active
                          : "");

                      return (
                        <li key={navItem2.label}>
                          <Tooltip placement="right" title={navItem2.tooltip}>
                            <Link className={className} href={navItem2.href}>
                              {navItem2.icon}
                              <span className="navItemLinkLabel">
                                {" "}
                                {navItem2.label}
                              </span>
                            </Link>
                          </Tooltip>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <Tooltip placement="right" title={navItem.tooltip}>
                  <Link
                    className={
                      styles.navLink +
                      (router.pathname === navItem.href
                        ? " " + styles.active
                        : "")
                    }
                    href={navItem.href}
                  >
                    {navItem.icon}
                    <span className="navItemLinkLabel"> {navItem.label}</span>
                  </Link>
                </Tooltip>
              )}
            </li>
          ))}
          <li className={styles.logout}>
            <Tooltip placement="right" title="Đăng xuất">
              <>
                <LogoutIcon />
                <span className="navItemLinkLabel"> Đăng xuất</span>
              </>
            </Tooltip>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
