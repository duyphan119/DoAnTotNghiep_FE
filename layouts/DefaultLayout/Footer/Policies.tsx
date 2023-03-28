import React, { FC } from "react";
import Link from "next/link";
import styles from "./_style.module.scss";

type Props = {};

type Policy = {
  href: string;
  label: string;
};

const policies: Policy[] = [
  {
    href: "/chinh-sach-doi-tra",
    label: "Chính sách đổi trả",
  },
  {
    href: "/chinh-sach-giao-hang",
    label: "Chính sách giao hàng",
  },
  {
    href: "/chinh-sach-bao-mat",
    label: "Chính sách bảo mật",
  },
  {
    href: "/dieu-khoan-dich-vu",
    label: "Điều khoản dịch vụ",
  },
  {
    href: "/lien-he",
    label: "Liên hệ",
  },
];

const Policies: FC<Props> = () => {
  return (
    <ul className={styles.policies}>
      {policies.map((item) => {
        return (
          <li key={item.label}>
            <Link href={item.href} className="text-hover">
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Policies;
