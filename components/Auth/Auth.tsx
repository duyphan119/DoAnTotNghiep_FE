import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { authActions, authSelector } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";
import ModalAuth from "../ModalAuth";

type Props = Partial<{
  children: ReactNode;
}>;

const Auth = ({ children }: Props) => {
  const appDispatch = useAppDispatch();
  const { openModalAuth } = useSelector(authSelector);

  useEffect(() => {
    appDispatch(authActions.fetchGetProfile());
  }, []);

  return (
    <>
      {openModalAuth ? (
        <ModalAuth
          open={openModalAuth}
          onClose={() => appDispatch(authActions.hideModalAuth())}
        />
      ) : null}
      {children}
    </>
  );
};

export default Auth;
