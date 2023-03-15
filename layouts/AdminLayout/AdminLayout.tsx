import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/slice/authSlice";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import { useAppDispatch } from "@/redux/store";
import { publicRoutes } from "@/utils/routes";
import Header from "./Header";
import Sidebar from "./Sidebar";

export const DRAWER_WIDTH = 280;

const Content = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flex: 1,
  padding: `16px 16px 16px ${DRAWER_WIDTH + 16}px`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  backgroundColor: "rgb(249,249,249)",
}));

type Props = Partial<{
  children: ReactNode;
  pageTitle: string;
}>;

const AdminLayout = ({ children, pageTitle }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { profile } = useSelector(authSelector);
  const { isError, isBack } = useSelector(fetchSelector);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (router.pathname.includes("/admin") && isError && !profile)
      router.push(publicRoutes.adminSignin);
  }, [isError, profile]);

  useEffect(() => {
    if (isBack) {
      appDispatch(fetchActions.setBack(false));
      router.back();
    }
  }, [isBack]);

  if (!profile) return null;
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header
        pageTitle={pageTitle}
        onToggle={() => {
          setOpen((o) => !o);
        }}
      />
      <Box
        display="flex"
        sx={{
          flex: 1,
          marginTop: "80px",
        }}
      >
        <Sidebar open={open} />
        <Content open={open}>{children}</Content>
      </Box>
    </Box>
  );
};
export default AdminLayout;
