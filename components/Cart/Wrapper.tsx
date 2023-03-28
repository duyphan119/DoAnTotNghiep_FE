import React, { FC, ReactNode } from "react";
import styles from "./_style.module.scss";

type Props = {
  title: string;
  children: ReactNode;
};

const Wrapper: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default Wrapper;
