import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Container } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { getSettingWebsiteByKeys } from "../../../../apis/settingwebsite";
import { authSelector } from "../../../../redux/slice/authSlice";
import { MSG_SUCCESS } from "../../../../utils/constants";
import { protectedRoutes } from "../../../../utils/routes";
import { SettingWebsite } from "../../../../utils/types";
import AccountIcon from "./AccountIcon";
import styles from "./_style.module.scss";
type Props = {};

const Top = (props: Props) => {
  const { profile } = useSelector(authSelector);
  const [settings, setSettings] = useState<SettingWebsite[]>([]);

  const PhoneContact = () => {
    const phoneContact = settings.find(
      (setting: SettingWebsite) => setting.key === "Phone Contact"
    );
    if (!phoneContact) return <></>;
    return (
      <li>
        <a href={`tel://${phoneContact.value}`} className={styles.contactLink}>
          <PhoneIcon />
          {phoneContact.value}
        </a>
      </li>
    );
  };

  const EmailContact = () => {
    const emailContact = settings.find(
      (setting: SettingWebsite) => setting.key === "Email Contact"
    );
    if (!emailContact) return <></>;
    return (
      <li>
        <a
          href={`mailto://${emailContact.value}`}
          className={styles.contactLink}
        >
          <EmailIcon />
          {emailContact.value}
        </a>
      </li>
    );
  };

  useEffect(() => {
    // const fetchSettings = async () => {
    //   const keys = ["Email Contact", "Phone Contact"];
    //   try {
    //     const { data, message } = await getSettingWebsiteByKeys(keys);
    //     if (message === MSG_SUCCESS) {
    //       setSettings(data.items);
    //     }
    //   } catch (error) {
    //     console.log("GET SETTINGS WEBSITE BY KEYS ERROR", error);
    //   }
    // };
    // fetchSettings();
  }, []);

  return (
    <div className={styles.contact}>
      <Container maxWidth="lg">
        <div className={styles.contactWrapper}>
          <div>Miễn phí giao hàng</div>
          <ul
            className={styles.contactList}
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
          >
            <PhoneContact />
            <EmailContact />
            <li>
              <AccountIcon />
            </li>
            {profile && profile.isAdmin ? (
              <li>
                <Link href={protectedRoutes.admin} className={styles.adminLink}>
                  Trang Admin
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Top;
