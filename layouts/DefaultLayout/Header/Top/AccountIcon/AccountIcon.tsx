import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../redux/store";
import {
  authActions,
  authSelector,
} from "../../../../../redux/slice/authSlice";
import { protectedRoutes } from "../../../../../utils/routes";
import styles from "../style.module.css";
type Props = {};

const AccountIcon = (props: Props) => {
  const { profile } = useSelector(authSelector);
  const appDispatch = useAppDispatch();
  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    appDispatch(authActions.showModalAuth());
  };
  return profile ? (
    <Link href={protectedRoutes.profile} className={styles.contactLink}>
      <PersonIcon />
      Tài khoản
    </Link>
  ) : (
    <span onClick={handleClick} className={styles.contactLink}>
      <PersonIcon />
      Đăng nhập
    </span>
  );
};

export default AccountIcon;
