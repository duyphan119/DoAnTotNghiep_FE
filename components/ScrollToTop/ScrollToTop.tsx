import { useEffect, useState } from "react";
import styles from "./style.module.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
type Props = {};

const ScrollToTop = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const scroll = (e: Event) => {
      setVisible(window.scrollY > 0);
    };
    document.addEventListener("scroll", scroll);

    return () => document.removeEventListener("scroll", scroll);
  }, []);

  const handleClick = () => {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  };

  return visible ? (
    <div className={styles["scroll-to-top"]}>
      <button className={styles.btn} onClick={handleClick}>
        <ArrowUpwardIcon />
      </button>
    </div>
  ) : null;
};

export default ScrollToTop;
