import { DefaultLayoutWrapper } from "@/context";
import { GroupProductHeaderModel, OrderModel, UserModel } from "@/models";
import { groupProductActions } from "@/redux/slice/groupProductSlice";
import { useAppDispatch } from "@/redux/store";
import { CSSProperties, ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./_style.module.scss";

type Props = Partial<{
  children: ReactNode;
  contentStyle: CSSProperties;
  profile: UserModel;
}>;

const DefaultLayout = ({ children, contentStyle, profile }: Props) => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(groupProductActions.fetchGetGroupProductHeaders());
  }, []);

  return (
    <DefaultLayoutWrapper profile={profile || new UserModel()}>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.body}>
          <div
            className={styles.content}
            style={{ marginBlock: "12px", ...contentStyle }}
          >
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
