import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../redux/slice/authSlice";
import { protectedRoutes } from "../../../../utils/routes";

type Props = {};

const AccountIcon = (props: Props) => {
  const { profile } = useSelector(authSelector);
  console.log("profile:::::", profile);
  return profile ? (
    <Link href={protectedRoutes.profile}>
      Xin chào, <strong>Duy Phan</strong>
    </Link>
  ) : (
    <div>Đăng nhập</div>
  );
};

export default AccountIcon;
