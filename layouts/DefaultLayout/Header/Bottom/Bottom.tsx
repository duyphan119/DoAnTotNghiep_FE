import { Container, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import logoPng from "../../../../public/logo.png";
import moneyPng from "../../../../public/money.png";
import { authSelector } from "../../../../redux/slice/authSlice";
import { publicRoutes } from "../../../../utils/routes";
import CartIcon from "./CartIcon";
import Categories from "./Categories";
import Drawer from "./Drawer";
import SearchInput from "./SearchInput";
import styles from "./style.module.css";
import { useState } from "react";

type Props = {};

const DPoint = () => {
  const { profile } = useSelector(authSelector);
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
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.headerBottom}>
      <Container maxWidth="lg">
        <div className={styles.container}>
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
          <IconButton
            onClick={() => setOpen((o) => !o)}
            className={styles.buttonSearch}
          >
            <SearchOutlinedIcon />
          </IconButton>
          <SearchInput open={open} />
          <div className={styles.right}>
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
        </div>
      </Container>
    </div>
  );
};

export default Bottom;
