import { Box } from "@mui/material";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../../apis/auth";
import { authSelector } from "../../redux/slice/authSlice";
import { COOKIE_ACCESSTOKEN_NAME, MSG_SUCCESS } from "../../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = Partial<{
  children: ReactNode;
  pageTitle: string;
}>;

const AdminLayout = ({ children, pageTitle }: Props) => {
  const router = useRouter();
  const { profile, isSuccess } = useSelector(authSelector);

  useEffect(() => {
    if (router.pathname.includes("/admin") && isSuccess && !profile)
      router.push("/admin/signin");
  }, [isSuccess, profile]);

  return profile ? (
    <Box display="flex">
      <Sidebar />
      <Box display="flex" flexDirection="column" flex={1}>
        <Header pageTitle={pageTitle} />
        <Box flex={1} padding="16px">
          {children}
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default AdminLayout;
