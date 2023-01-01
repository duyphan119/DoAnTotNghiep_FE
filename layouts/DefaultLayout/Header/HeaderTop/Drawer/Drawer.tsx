import React, { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styles from "../style.module.css";
import Link from "next/link";
type Props = {};

const Drawer = (props: Props) => {
  const [state, setState] = useState<boolean>(false);
  const toggleDrawer = (newState: boolean) => {
    setState(newState);
  };
  return (
    <div className={styles["menu-icon"]}>
      <IconButton onClick={() => toggleDrawer(true)}>
        <MenuOutlinedIcon />
      </IconButton>
      <MuiDrawer
        open={state}
        onClose={() => toggleDrawer(false)}
        anchor="right"
        className={styles["drawer-body"]}
      >
        <nav>
          <ul className={styles["nav-items"]}>
            <li className={styles["nav-item"]}>
              <Link href="/">Trang chủ</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link href="/cart">Giỏ hàng</Link>
            </li>
          </ul>
        </nav>
      </MuiDrawer>
    </div>
  );
};

export default Drawer;
