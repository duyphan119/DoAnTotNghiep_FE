import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authSelector } from "@/redux/slice/authSlice";
import { protectedRoutes } from "@/utils/routes";
import styles from "../_style.module.scss";

type Props = {};

const AccountIcon = (props: Props) => {
  const { profile } = useSelector(authSelector);
  return !profile || profile.id > 0 ? (
    <Link href={protectedRoutes.settingProfile}>
      <span className={styles.iconSpan}>
        <AccountCircleIcon className={styles.icon} />
      </span>
    </Link>
  ) : (
    <span className={styles.iconSpan}>
      <AccountCircleIcon className={styles.icon} />
    </span>
  );
};

export default AccountIcon;
