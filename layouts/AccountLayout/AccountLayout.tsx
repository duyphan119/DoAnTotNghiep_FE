import { Container, Grid } from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { NotFound } from "../../components";
import { authSelector } from "../../redux/slice/authSlice";
import DefaultLayout from "../DefaultLayout";
import Sidebar from "./Sidebar";
type Props = Partial<{
  children: ReactNode;
  titleHeading: string;
}>;

const AccountLayout = ({ children, titleHeading }: Props) => {
  const { profile, isSuccess } = useSelector(authSelector);

  if (isSuccess && !profile) {
    return <NotFound />;
  }

  return isSuccess ? (
    <DefaultLayout>
      <main>
        <Container maxWidth="lg">
          <Grid container columnSpacing={3} rowSpacing={3}>
            {titleHeading ? (
              <>
                <Grid item md={3} xs={12}></Grid>
                <Grid item md={9} xs={12}>
                  <h1>{titleHeading}</h1>
                </Grid>
              </>
            ) : null}
            <Grid item md={3} xs={12}>
              <Sidebar />
            </Grid>
            <Grid item md={9} xs={12}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </DefaultLayout>
  ) : null;
};

export default AccountLayout;
