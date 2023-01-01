import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
type Props = {
  pageTitle: string;
};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        {props.pageTitle}
      </div>
      <div className={styles.center}>
        <form className={styles.formSearch}>
          <SearchIcon className={styles.searchIcon} />
          <input type="search" placeholder="Tìm kiếm" />
        </form>
      </div>
      <div className={styles.right}>
        <span className={styles.iconSpan}>
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon className={styles.icon} />
          </Badge>
        </span>
        <span className={styles.iconSpan}>
          <Badge badgeContent={3} color="error">
            <ChatBubbleOutlineIcon className={styles.icon} />
          </Badge>
        </span>
        <Link href="/admin/profile">
          Xin chào, <strong>Duy Phan</strong>
        </Link>
      </div>
    </header>
  );
};

export default Header;
