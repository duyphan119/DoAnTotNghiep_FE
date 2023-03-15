import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { publicRoutes } from "@/utils/routes";
import notfoundSvg from "@/public/404.svg";
import styles from "./_style.module.scss";

type Props = {};

const NotFound = (props: Props) => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Không tìm thấy trang";
    setState(true);
  }, []);

  return state ? (
    <div className={styles.wrapper}>
      <Image
        src={notfoundSvg}
        alt="404"
        priority={true}
        width={320}
        height={240}
      />
      <h1 className={styles.text}>
        Rất tiếc, trang bạn truy cập không tồn tại
      </h1>
      <Link
        href={publicRoutes.home}
        className={"btnAdd " + styles.backHomeLink}
      >
        Quay về trang chủ
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default NotFound;
