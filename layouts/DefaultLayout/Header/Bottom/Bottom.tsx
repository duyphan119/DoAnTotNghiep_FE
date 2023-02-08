import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import logoPng from "../../../../public/logo.png";
import moneyPng from "../../../../public/money.png";
import { authSelector } from "../../../../redux/slice/authSlice";
import { groupProductManagementActions } from "../../../../redux/slice/groupProductManagementSlice";
import { useAppDispatch } from "../../../../redux/store";
import { publicRoutes } from "../../../../utils/routes";
import CartIcon from "./CartIcon";
import Categories from "./Categories";
import Drawer from "./Drawer";
import SearchInput from "./SearchInput";
import styles from "./_style.module.scss";

type Props = {};

const DPoint = () => {
  const { profile } = useSelector(authSelector);
  return profile ? (
    <li className={styles.item}>
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
    </li>
  ) : (
    <></>
  );
};

const Bottom = (props: Props) => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(groupProductManagementActions.fetchHeaderData());
  }, []);
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
              SHOP
            </Link>
            <Categories />
          </div>
          <SearchInput />
          <div className={styles.right}>
            <ul className={styles.items}>
              <DPoint />
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
