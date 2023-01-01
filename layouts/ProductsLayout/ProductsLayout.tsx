import {
  Container,
  Grid,
  Box,
  IconButton,
  Drawer,
  Breadcrumbs,
} from "@mui/material";
import { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DefaultLayout from "../DefaultLayout";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Link from "next/link";
import styles from "./style.module.css";

type BreadcrumbLink = {
  label: string;
  href: string;
};

type Props = {
  children?: React.ReactNode;
  totalProducts: number;
  onFilter?: any;
  query?: any;
  breadcrumbs?: {
    links: Array<BreadcrumbLink>;
    current: string;
  };
};

const ProductsLayout = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DefaultLayout>
      <Container maxWidth="lg">
        {props.breadcrumbs ? (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs>
              {props.breadcrumbs.links.map((link: BreadcrumbLink) => (
                <Link
                  className={styles["breadcrumb-link"]}
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </Breadcrumbs>
            <div className={styles["breadcrumb-current"]}>
              {props.breadcrumbs.current}
            </div>
          </div>
        ) : null}

        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={4} xl={3}></Grid>
          <Grid
            item
            xs={12}
            lg={8}
            xl={9}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                display: {
                  xs: "block",
                  lg: "none",
                },
              }}
            >
              <IconButton onClick={() => setOpen(true)}>
                <FilterAltOutlinedIcon />
              </IconButton>
              <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
                <Box sx={{ maxWidth: "50vw", padding: "16px" }}>
                  <Sidebar
                    onFilter={props.onFilter}
                    query={props.query}
                    onClose={() => setOpen(false)}
                  />
                </Box>
              </Drawer>
            </Box>
            <Header
              onFilter={props.onFilter}
              totalProducts={props.totalProducts}
              query={props.query}
            />
          </Grid>
          <Grid
            item
            xs={4}
            xl={3}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            <Sidebar onFilter={props.onFilter} query={props.query} />
          </Grid>
          <Grid item xs={12} lg={8} xl={9}>
            {props.children}
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default ProductsLayout;
