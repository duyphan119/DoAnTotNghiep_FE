import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import NotifyIcon from "./NotifyIcon";
import AccountIcon from "./AccountIcon";
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
        <NotifyIcon />
        <span className={styles.iconSpan}>
          <Badge badgeContent={3} color="error">
            <ChatBubbleOutlineIcon className={styles.icon} />
          </Badge>
        </span>
        <AccountIcon />
      </div>
    </header>
  );
};

export default Header;
