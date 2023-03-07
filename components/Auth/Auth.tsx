import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { OrderModel } from "../../models";
import {
  authActions,
  authReducer,
  authSelector,
} from "../../redux/slice/authSlice";
import { cartActions } from "../../redux/slice/cartSlice";
import { fetchSelector } from "../../redux/slice/fetchSlice";
import { useAppDispatch } from "../../redux/store";
import ModalAuth from "../ModalAuth";

type Props = Partial<{
  children: ReactNode;
}>;

const Auth = ({ children }: Props) => {
  const appDispatch = useAppDispatch();
  const { openModalAuth } = useSelector(authSelector);
  const { reducers } = useSelector(fetchSelector);

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
