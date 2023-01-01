import React from "react";
import DefaultLayout from "../DefaultLayout";
import { Container, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
type Props = {
  children?: React.ReactNode;
  titleHeading?: string;
};

const AccountLayout = (props: Props) => {
  return (
    <DefaultLayout>
      <main>
        <Container maxWidth="lg">
          <Grid container columnSpacing={3}>
            {props.titleHeading ? (
              <>
                <Grid item md={3} xs={12}></Grid>
                <Grid item md={9} xs={12}>
                  <h1>{props.titleHeading}</h1>
                </Grid>
              </>
            ) : null}
            <Grid item md={3} xs={12}>
              <Sidebar />
            </Grid>
            <Grid item md={9} xs={12}>
              {props.children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </DefaultLayout>
  );
};

export default AccountLayout;
