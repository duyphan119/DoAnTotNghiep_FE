import { Grid } from "@mui/material";
import Contact from "./Contact";
import Policies from "./Policies";
import RegisterGiveNotification from "./RegisterGiveNotification";
import Wrapper from "./Wrapper";
import About from "./About";
import styles from "./_style.module.scss";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className={styles.footer}>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Wrapper title="Về chúng tôi" style={{ borderLeft: "none" }}>
            <About />
          </Wrapper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Wrapper title="Thông tin liên hệ">
            <Contact />
          </Wrapper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Wrapper title="Chính sách">
            <Policies />
          </Wrapper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Wrapper title="Đăng ký nhận tin">
            <RegisterGiveNotification />
          </Wrapper>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
