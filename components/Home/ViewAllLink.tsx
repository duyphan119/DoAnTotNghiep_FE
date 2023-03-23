import { publicRoutes } from "@/utils/routes";
import { Grid } from "@mui/material";
import Link from "next/link";
import { FC, Fragment, memo, ReactNode } from "react";
import styles from "./_style.module.scss";

type Props = {
  children: ReactNode;
  isVisible: boolean;
};

const ViewAllLink: FC<Props> = ({ children, isVisible }) => {
  if (!isVisible) return <Fragment></Fragment>;
  return (
    <Grid item xs={12} className={styles.viewAllWrapper}>
      <Link href={publicRoutes.products()} className={styles.viewAll}>
        {children}
      </Link>
    </Grid>
  );
};

export default memo(ViewAllLink);
