import { GroupProductHeaderModel, OrderModel, UserModel } from "@/models";
import { UserJson } from "@/types/json";
import { Container, Grid } from "@mui/material";
import { ReactNode } from "react";
import DefaultLayout from "../DefaultLayout";
import Sidebar from "./Sidebar";

type Props = Partial<{
  children: ReactNode;
  titleHeading: string;
}> & {
  profile: UserJson | null;
};

const AccountLayout = ({ children, titleHeading, profile }: Props) => {
  // const { profile } = useSelector(authSelector);
  // const { isLoading, isError } = useSelector(fetchSelector);

  // if (!isLoading && isError && profile.id === 0) {
  //   return <NotFound />;
  // }

  return (
    <DefaultLayout profile={new UserModel(profile)}>
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
  );
};

export default AccountLayout;
