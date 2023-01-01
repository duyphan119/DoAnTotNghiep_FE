import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./style.module.css";

type Props = {
  children?: ReactNode;
};

const DefaultLayout = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
        <div className={styles.content}>{props.children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
