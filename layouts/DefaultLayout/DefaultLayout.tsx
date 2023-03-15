import { CSSProperties, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./_style.module.scss";

type Props = Partial<{
  children: ReactNode;
  contentStyle: CSSProperties;
}>;

const DefaultLayout = ({ children, contentStyle }: Props) => {
  return (
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
  );
};

export default DefaultLayout;
