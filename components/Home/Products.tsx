import { ProductModel } from "@/models";
import { publicRoutes } from "@/utils/routes";
import { Container, Grid } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { ProductCard } from "../common";
import ViewAllLink from "./ViewAllLink";
import styles from "./_style.module.scss";

type Props = {
  products: ProductModel[];
};

const Products: FC<Props> = ({ products }) => {
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={3} rowSpacing={3}>
        {products.map((product) => {
          return (
            <Grid
              item
              xs={6}
              md={4}
              sm={3}
              sx={{
                flexBasis: {
                  lg: "20%",
                },
              }}
              key={product.id}
            >
              <ProductCard product={product} />
            </Grid>
          );
        })}
        <ViewAllLink isVisible={products.length > 0}>
          Xem tất cả sản phẩm
        </ViewAllLink>
      </Grid>
    </Container>
  );
};

export default Products;
