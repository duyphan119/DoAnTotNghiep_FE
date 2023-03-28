import { CSSProperties, FC, ReactNode } from "react";
import styles from "./_style.module.scss";

type Props = {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
};

const Wrapper: FC<Props> = ({ title, children, style }) => {
  return (
    <div className={styles.wrapper} style={{ ...style }}>
      <h4 className={styles.title}>{title}</h4>
      {children}
    </div>
  );
};

export default Wrapper;
