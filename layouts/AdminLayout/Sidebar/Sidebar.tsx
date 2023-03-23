import Link from "next/link";
import { memo } from "react";
import { Box, Tooltip, Drawer } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";

import styles from "./_style.module.scss";
import { useThemeContext } from "../../../context/ThemeContext";
import { DRAWER_WIDTH } from "../AdminLayout";
import { NavItem, navItems } from "./navItems";

type Props = {
  open: boolean;
};

const Sidebar = ({ open }: Props) => {
  const router = useRouter();
  const { theme } = useThemeContext();

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          top: 80,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        component="aside"
        className={`${styles.sidebar} custom-scrollbar`}
        id={theme}
      >
        <Box component="nav" className={styles.nav}>
          <ul
            className={`${styles.navItems} ${
              theme === "dark" ? styles.navItemsDark : ""
            }`}
          >
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
                          (navItem1: NavItem) =>
                            navItem1.href === router.pathname
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
    </Drawer>
  );
};

export default memo(Sidebar);
