import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authActions, authSelector } from "../../../redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";
import { protectedRoutes, publicRoutes } from "@/utils/routes";
import styles from "./_style.module.scss";
type Props = {};

const items: any[] = [
  {
    href: protectedRoutes.profile,
    label: "Tài khoản",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    href: protectedRoutes.address,
    label: "Sổ địa chỉ",
    icon: <HomeOutlinedIcon />,
  },
  {
    href: protectedRoutes.myOrders,
    label: "Theo dõi đơn hàng",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    href: protectedRoutes.customerChangePassword,
    label: "Đổi mật khẩu",
    icon: <PasswordOutlinedIcon />,
  },
];

const Sidebar = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const handleLogout = () => {
    router.push(publicRoutes.home);
    appDispatch(authActions.fetchLogout());
  };

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {items.map((item: any) => {
          return (
            <li
              key={item.href}
              className={`${styles.item} ${
                router.pathname === item.href ? styles.active : ""
              }`}
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className={styles.item} onClick={handleLogout}>
          <button>
            <LogoutOutlinedIcon />
            Đăng xuất
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
