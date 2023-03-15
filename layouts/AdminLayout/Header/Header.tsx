import React from "react";
import styles from "./_style.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton, Box } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import NotifyIcon from "./NotifyIcon";
import AccountIcon from "./AccountIcon";
import { DarkLightButton } from "@/components";
import { useThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { protectedRoutes } from "@/utils/routes";
import Image from "next/image";
import logoPng from "../../../public/logo.png";
type Props = Partial<{
  pageTitle: string;
  onToggle: any;
}>;

const Header = ({ pageTitle, onToggle }: Props) => {
  const { theme } = useThemeContext();
  return (
    <Box
      component="header"
      className={`${styles.header} ${
        theme === "dark" ? styles.headerDark : ""
      }`}
    >
      <div className={`headerLeft ${styles.left}`}>
        <Link className={styles.logo} href={protectedRoutes.admin}>
          <Image
            src={logoPng}
            alt="Logo"
            width={40}
            height={40}
            priority={true}
          />
          <span className="logoText">SHOP</span>
        </Link>
        <IconButton onClick={() => onToggle()}>
          <MenuIcon />
        </IconButton>
      </div>
      <Box className={"headerCenter " + styles.center}>
        <form className={styles.formSearch}>
          <SearchIcon className={styles.searchIcon} />
          <input type="search" placeholder="Tìm kiếm" />
        </form>
      </Box>
      <div className={styles.right}>
        <DarkLightButton />
        <NotifyIcon />
        <span className={styles.iconSpan}>
          <Badge badgeContent={3} color="error">
            <ChatBubbleOutlineIcon className={styles.icon} />
          </Badge>
        </span>
        <AccountIcon />
      </div>
    </Box>
  );
};

export default Header;
