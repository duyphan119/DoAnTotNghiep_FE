import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logoPng from "../../../../public/logo.png";
import CartIcon from "./CartIcon";
import Drawer from "./Drawer";
import SearchInput from "./SearchInput";
import styles from "./style.module.css";
import WishlistIcon from "./WishlistIcon";
type Props = {};

const HeaderTop = (props: Props) => {
  return (
    <div className={styles["header-top"]}>
      <Container maxWidth="lg" className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <Image
              src={logoPng}
              alt="Logo"
              width={56}
              height={56}
              priority={true}
            />
            DUS
          </Link>
          <Drawer />
        </div>
        <div className={styles.center}>
          <SearchInput />
        </div>
        <div className={styles.right}>
          <ul className={styles.items}>
            {/* <li className={styles.item}>
              <WishlistIcon />
            </li> */}
            <li className={styles.item}>
              <CartIcon />
            </li>
          </ul>

          {/* <nav className={styles.bottom}>
          <ul className={styles["nav-menu"]}>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
          </ul>
        </nav> */}
        </div>
      </Container>
    </div>
  );
};

export default HeaderTop;
