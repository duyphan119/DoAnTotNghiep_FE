import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Drawer as MuiDrawer, IconButton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { groupProductManagementSelector } from "../../../../../redux/slice/groupProductManagementSlice";
import { publicRoutes } from "../../../../../utils/routes";
import { GroupProduct, GroupProductHeader } from "../../../../../utils/types";
import styles from "../style.module.css";
type Props = {};

const Drawer = (props: Props) => {
  const { headerData } = useSelector(groupProductManagementSelector);
  const [state, setState] = useState<boolean>(false);
  const toggleDrawer = (newState: boolean) => {
    setState(newState);
  };
  return (
    <div className={styles.menuIcon}>
      <IconButton onClick={() => toggleDrawer(true)}>
        <MenuOutlinedIcon />
      </IconButton>
      <MuiDrawer
        open={state}
        onClose={() => toggleDrawer(false)}
        anchor="right"
        className={styles.drawerBody}
      >
        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href={publicRoutes.home} className={styles.navItemLink}>
                Trang chủ
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={publicRoutes.cart} className={styles.navItemLink}>
                Giỏ hàng
              </Link>
            </li>
            {headerData.map((item: GroupProductHeader, index: number) => {
              return (
                <li className={styles.navItem} key={item.name}>
                  <div className={styles.navItemWrapper}>
                    <Link
                      className={styles.navItemLink}
                      href={`/product/group-product/${item.slug}`}
                    >
                      {item.name}
                    </Link>
                    {item.items.length > 0 ? (
                      <label
                        className={styles.navItemLabel}
                        htmlFor={`navItem${index}`}
                      >
                        <KeyboardArrowDownIcon />
                      </label>
                    ) : null}
                  </div>
                  {item.items.length > 0 ? (
                    <>
                      <input
                        type="checkbox"
                        id={`navItem${index}`}
                        hidden
                        className={styles.navItemCheckbox}
                      />
                      <ul className={styles.navMenuItems}>
                        {item.items.map((gp: GroupProduct) => {
                          return (
                            <li key={gp.id} className={styles.navMenuItem}>
                              <Link
                                href={`/product/group-product/${gp.slug}`}
                                className={styles.navMenuItemLink}
                              >
                                {gp.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </MuiDrawer>
    </div>
  );
};

export default Drawer;
