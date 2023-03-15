import { authActions, authSelector } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";
import { protectedRoutes } from "@/utils/routes";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";
type Props = {};

const AccountIcon = (props: Props) => {
  const { profile } = useSelector(authSelector);
  const appDispatch = useAppDispatch();
  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    appDispatch(authActions.showModalAuth());
  };

  const handleLogout = () => {
    appDispatch(authActions.fetchLogout());
  };

  return !profile || profile.id > 0 ? (
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
        <li className="text-hover" onClick={handleLogout}>
          Đăng xuất
        </li>
      </ul>
    </div>
  ) : (
    <span onClick={handleClick} className={styles.authLink}>
      <PersonIcon />
      Đăng nhập
    </span>
  );
};

export default AccountIcon;
