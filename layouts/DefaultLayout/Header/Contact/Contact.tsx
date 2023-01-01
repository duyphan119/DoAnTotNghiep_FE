import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Container } from "@mui/material";
import styles from "../../style.module.css";
import AccountIcon from "./AccountIcon";
type Props = {};

const Contact = (props: Props) => {
  return (
    <div className={styles.contact}>
      <Container maxWidth="lg" className={styles.contactWrapper}>
        <div>Miễn phí giao hàng</div>
        <ul className={styles.contactList}>
          <li>
            <a href="tel://0385981196" className={styles.contactLink}>
              <PhoneIcon />
              038 598 1196
            </a>
          </li>
          <li>
            <a
              href="mailto://duychomap123@gmail.com"
              className={styles.contactLink}
            >
              <EmailIcon />
              duychomap123@gmail.com
            </a>
          </li>
          <li>
            <AccountIcon />
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Contact;
