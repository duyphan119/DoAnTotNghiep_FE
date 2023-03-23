import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { authActions, authSelector } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";
import { protectedRoutes, publicRoutes } from "@/utils/routes";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";
type Props = {};

const AccountIcon = (props: Props) => {
  // const { profile } = useSelector(authSelector);
  const { profile } = useDefaultLayoutContext();
  const appDispatch = useAppDispatch();
  const { logout } = useDefaultLayoutContext();

  const handleLogout = () => {
    appDispatch(authActions.fetchLogout());
  };

  return profile.id > 0 ? (
    <div className={styles.accountWrapper}>
      <Link href={protectedRoutes.profile} className={styles.authLink}>
        <PersonIcon />
        Tài khoản
      </Link>
      <ul className={styles.authDropdown}>
        <li className="text-hover">
          <Link href={protectedRoutes.profile}>Thông tin tài khoản</Link>
        </li>
        <li className="text-hover">
          <Link href={protectedRoutes.myOrders}>Đơn hàng của tôi</Link>
        </li>
        <li className="text-hover">
          <Link href={protectedRoutes.customerChangePassword}>
            Đổi mật khẩu
          </Link>
        </li>
        <li className="text-hover" onClick={logout}>
          Đăng xuất
        </li>
      </ul>
    </div>
  ) : (
    <Link href={publicRoutes.userSignin} className={styles.authLink}>
      <PersonIcon />
      Đăng nhập
    </Link>
  );
};

export default AccountIcon;
