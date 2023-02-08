import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./_style.module.scss";

type Props = Partial<{
  children: ReactNode;
}>;

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
