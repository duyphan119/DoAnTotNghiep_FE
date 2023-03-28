import { DefaultLayoutWrapper } from "@/context";
import { GroupProductHeaderModel, OrderModel, UserModel } from "@/models";
import { groupProductActions } from "@/redux/slice/groupProductSlice";
import { useAppDispatch } from "@/redux/store";
import { CSSProperties, FC, ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./_style.module.scss";

type Props = Partial<{
  children: ReactNode;
  contentStyle: CSSProperties;
  profile: UserModel;
  hideHeader: boolean;
  hideFooter: boolean;
}>;

const DefaultLayout: FC<Props> = ({
  children,
  contentStyle,
  profile,
  hideFooter,
  hideHeader,
}) => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (!hideHeader)
      appDispatch(groupProductActions.fetchGetGroupProductHeaders());
  }, [hideHeader]);

  console.log(profile);

  return (
    <DefaultLayoutWrapper profile={profile || new UserModel()}>
      <div className={styles.wrapper}>
        {hideHeader ? null : <Header />}
        <div className={styles.body}>
          <div
            className={styles.content}
            style={{ marginBlock: "12px", ...contentStyle }}
          >
            {children}
          </div>
          {hideFooter ? null : <Footer />}
        </div>
      </div>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
