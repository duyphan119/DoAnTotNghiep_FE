import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "../../context/ThemeContext";
import styles from "./_style.module.scss";

type Props = {};

const DarkLightButton = (props: Props) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      className={`${styles.btn} ${theme === "dark" ? styles.dark : ""}`}
      onClick={() => toggleTheme()}
    >
      <span className={styles.icon}>
        {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      </span>
      <span className={styles.circle}></span>
    </button>
  );
};

export default DarkLightButton;
