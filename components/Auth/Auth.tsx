import { authActions } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";
import { ReactNode, useEffect } from "react";

type Props = Partial<{
  children: ReactNode;
}>;

const Auth = ({ children }: Props) => {
  const appDispatch = useAppDispatch();

  // useEffect(() => {
  //   appDispatch(authActions.fetchGetProfile());
  // }, []);

  return <>{children}</>;
};

export default Auth;
