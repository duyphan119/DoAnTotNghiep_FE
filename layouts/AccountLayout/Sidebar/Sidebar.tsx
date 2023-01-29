import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { authActions } from "../../../redux/slice/authSlice";
import { useAppDispatch } from "../../../redux/store";
import { publicRoutes } from "../../../utils/routes";
import styles from "./style.module.css";
type Props = {};

const items: any[] = [
  {
    href: "/profile",
    label: "Tài khoản",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    href: "/address",
    label: "Sổ địa chỉ",
    icon: <HomeOutlinedIcon />,
  },
  {
    href: "/order",
    label: "Theo dõi đơn hàng",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    href: "/change-password",
    label: "Đổi mật khẩu",
    icon: <PasswordOutlinedIcon />,
  },
];

const Sidebar = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const handleLogout = () => {
    appDispatch(authActions.fetchLogout());
    router.push(publicRoutes.home);
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
