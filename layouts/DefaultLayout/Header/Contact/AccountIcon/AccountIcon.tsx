import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useState } from "react";
import { ModalAuth } from "../../../../../components";
import { useAuthContext } from "../../../../../context/AuthContext";
import styles from "../../../style.module.css";
type Props = {};

const AccountIcon = (props: Props) => {
  const { isLogged } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = async (e: any) => {
    e.preventDefault();
    setOpen(true);
  };
  return isLogged ? (
    <Link href="/profile" className={styles.contactLink}>
      <PersonIcon />
      Tài khoản
    </Link>
  ) : (
    <>
      <span onClick={handleClick} className={styles.contactLink}>
        <PersonIcon />
        Đăng nhập
      </span>
      {open ? <ModalAuth open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
};

export default AccountIcon;
