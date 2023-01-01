import { Box } from "@mui/material";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { getProfile } from "../../apis/auth";
import { useAuthContext } from "../../context/AuthContext";
import { COOKIE_ACCESSTOKEN_NAME, MSG_SUCCESS } from "../../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children?: ReactNode;
  pageTitle: string;
};

const AdminLayout = (props: Props) => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const { login, changeProfile } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        if (hasCookie(COOKIE_ACCESSTOKEN_NAME)) {
          const { message, data } = await getProfile();
          if (message !== MSG_SUCCESS) {
            if (router.pathname.includes("/admin"))
              router.push("/admin/signin");
            changeProfile(null);
          } else {
            setIsLogged(true);
            login(data);
            return;
          }
        }
      } catch (error) {}
      if (router.pathname.includes("/admin")) router.push("/admin/signin");
      changeProfile(null);
    })();
  }, []);

  return isLogged ? (
    <Box display="flex">
      <Sidebar />
      <Box display="flex" flexDirection="column" flex={1}>
        <Header pageTitle={props.pageTitle} />
        <Box flex={1} padding="16px">
          {props.children}
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default AdminLayout;
