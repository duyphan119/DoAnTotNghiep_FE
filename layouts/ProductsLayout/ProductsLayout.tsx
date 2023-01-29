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
import Header from "./Header";
import Sidebar from "./Sidebar";
import Link from "next/link";
import styles from "./style.module.css";
import DefaultLayout from "../DefaultLayout";

type BreadcrumbLink = {
  label: string;
  href: string;
};

type Breadcrumb = {
  links: BreadcrumbLink[];
  current: string;
};
type Props = Partial<{
  children: React.ReactNode;
  totalProducts: number;
  onFilter: any;
  query: any;
  breadcrumbs: Breadcrumb;
}>;

const ProductsLayout = ({
  children,
  totalProducts,
  onFilter,
  query,
  breadcrumbs,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DefaultLayout>
      <Container maxWidth="lg">
        {breadcrumbs ? (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs>
              {breadcrumbs.links.map((link: BreadcrumbLink) => (
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
              {breadcrumbs.current}
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
                    onFilter={onFilter}
                    query={query}
                    onClose={() => setOpen(false)}
                  />
                </Box>
              </Drawer>
            </Box>
            <Header
              onFilter={onFilter}
              totalProducts={totalProducts}
              query={query}
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
            <Sidebar onFilter={onFilter} query={query} />
          </Grid>
          <Grid item xs={12} lg={8} xl={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default ProductsLayout;
