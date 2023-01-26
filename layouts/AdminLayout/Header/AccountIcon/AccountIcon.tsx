import Link from "next/link";
import React from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import { protectedRoutes } from "../../../../utils/routes";

type Props = {};

const AccountIcon = (props: Props) => {
  const { profile } = useAuthContext();
  console.log(profile);
  return profile ? (
    <Link href={protectedRoutes.profile}>
      Xin chào, <strong>Duy Phan</strong>
    </Link>
  ) : (
    <div>Đăng nhập</div>
  );
};

export default AccountIcon;
