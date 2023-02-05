import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton, Box } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import NotifyIcon from "./NotifyIcon";
import AccountIcon from "./AccountIcon";
type Props = Partial<{
  pageTitle: string;
  onToggle: any;
}>;

const Header = ({ pageTitle, onToggle }: Props) => {
  return (
    <Box
      component="header"
      className={styles.header}
      sx={{
        ".headerLeft": {
          display: {
            xs: "none",
            xl: "block",
          },
        },
      }}
    >
      <div className={"headerLeft " + styles.left}>
        <IconButton onClick={() => onToggle()}>
          <MenuIcon />
        </IconButton>
        {pageTitle}
      </div>
      <Box className={"headerCenter " + styles.center}>
        <form className={styles.formSearch}>
          <SearchIcon className={styles.searchIcon} />
          <input type="search" placeholder="Tìm kiếm" />
        </form>
      </Box>
      <div className={styles.right}>
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
