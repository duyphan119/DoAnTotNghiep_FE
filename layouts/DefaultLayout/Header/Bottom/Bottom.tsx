import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../../../../context/AuthContext";
import logoPng from "../../../../public/logo.png";
import moneyPng from "../../../../public/money.png";
import { publicRoutes } from "../../../../utils/routes";
import CartIcon from "./CartIcon";
import Categories from "./Categories";
import Drawer from "./Drawer";
import SearchInput from "./SearchInput";
import styles from "./style.module.css";

type Props = {};

const DPoint = () => {
  const { profile } = useAuthContext();
  return profile ? (
    <Link href="/d-point" className={styles.pointLink}>
      <Image
        src={moneyPng}
        alt="D-Point"
        width={24}
        height={24}
        priority={true}
      />
      {profile.point}
    </Link>
  ) : (
    <></>
  );
};

const Bottom = (props: Props) => {
  return (
    <div className={styles["header-top"]}>
      <Container maxWidth="lg" className={styles.container}>
        <div className={styles.left}>
          <Link href={publicRoutes.home} className={styles.logo}>
            <Image
              src={logoPng}
              alt="Logo"
              width={56}
              height={56}
              priority={true}
            />
            DUS
          </Link>
          <Categories />
        </div>

        <div className={styles.right}>
          <SearchInput />
          <ul className={styles.items}>
            <li className={styles.item}>
              <DPoint />
            </li>
            <li className={styles.item}>
              <CartIcon />
            </li>
          </ul>
          <Drawer />
        </div>
      </Container>
    </div>
  );
};

export default Bottom;
