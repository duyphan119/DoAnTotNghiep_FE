import React from "react";
import styles from "./_style.module.scss";

type Props = {};

const items: { left: string; right: string }[] = [
  {
    left: "Địa chỉ:",
    right: "450 Lê Văn Việt, Phường Tăng Nhơn Phú A, Tp. Thủ Đức, Tp. HCM.",
  },
  {
    left: "Điện thoại",
    right: "038 5981 196",
  },
  {
    left: "Email:",
    right: "6051071019@st.utc2.edu.vn",
  },
];

const Contact = (props: Props) => {
  return (
    <ul className={styles.contact}>
      {items.map(({ left, right }) => {
        return (
          <li key={left}>
            <span>{left}</span>&nbsp;
            <span>{right}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Contact;
