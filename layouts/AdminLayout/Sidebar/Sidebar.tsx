import Link from "next/link";
import React, { ReactElement } from "react";
import styles from "./style.module.css";
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
import { useRouter } from "next/router";

type Props = {};

type NavItem = {
  id?: string;
  href: string;
  label: string;
  icon?: ReactElement;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Trang chủ",
    icon: <HomeIcon />,
  },
  {
    href: "/admin/account",
    label: "Tài khoản",
    icon: <AccountBoxIcon />,
  },
  {
    href: "/admin/order",
    label: "Đơn hàng",
    icon: <LocalShippingIcon />,
  },
  {
    label: "Quản lý sản phẩm",
    icon: <TableRowsIcon />,
    id: "product",
    href: "",
    children: [
      {
        href: "/admin/group-product",
        label: "Nhóm sản phẩm",
      },
      {
        href: "/admin/product",
        label: "Sản phẩm",
      },
    ],
  },
  {
    href: "/admin/blog",
    label: "Bài viết",
    icon: <FeedIcon />,
  },
  {
    href: "/admin/advertisement",
    label: "Quảng cáo",
    icon: <CampaignIcon />,
  },
  {
    href: "",
    label: "Cài đặt",
    icon: <SettingsIcon />,
    id: "setting",
    children: [
      {
        href: "/admin/setting/profile",
        label: "Tài khoản",
      },
      {
        href: "/admin/setting/website",
        label: "Website",
      },
      {
        href: "/admin/setting/change-password",
        label: "Đổi mật khẩu",
      },
    ],
  },
];

const Sidebar = (props: Props) => {
  const router = useRouter();
  return (
    <aside className={styles.sidebar}>
      <Link className={styles.logo} href="/admin">
        LOGO
      </Link>
      <nav className={styles.nav}>
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
                  <label htmlFor={navItem.id} className={styles.hasMenu}>
                    {navItem.icon}
                    {navItem.label}
                    <KeyboardArrowDownIcon className={styles.closeMenuIcon} />
                    <KeyboardArrowLeftIcon className={styles.openMenuIcon} />
                  </label>
                  <ul className={styles.navMenu}>
                    {navItem.children.map((navItem2: NavItem) => {
                      return (
                        <Link
                          className={
                            styles.navLink +
                            (router.pathname === navItem2.href
                              ? " " + styles.active
                              : "")
                          }
                          href={navItem2.href}
                          key={navItem2.label}
                        >
                          {navItem2.icon} {navItem2.label}
                        </Link>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <Link
                  className={
                    styles.navLink +
                    (router.pathname === navItem.href
                      ? " " + styles.active
                      : "")
                  }
                  href={navItem.href}
                >
                  {navItem.icon} {navItem.label}
                </Link>
              )}
            </li>
          ))}
          <li className={styles.logout}>
            <LogoutIcon /> Đăng xuất
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
