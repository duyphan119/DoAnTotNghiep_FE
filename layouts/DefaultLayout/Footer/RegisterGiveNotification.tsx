import React from "react";
import Image from "next/image";
import emailIcon from "@/public/email-icon.svg";
import styles from "./_style.module.scss";

type Props = {};

const RegisterGiveNotification = (props: Props) => {
  return (
    <div className={styles.registerGiveNotification}>
      <p>
        Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông
        tin giảm giá khác.
      </p>
      <form>
        <label htmlFor="email1" className={styles.formControl}>
          <div className={styles.icon}>
            <Image
              src={emailIcon.src}
              height={emailIcon.height}
              width={emailIcon.width}
              alt=""
              priority={true}
            />
          </div>
          <input
            id="email1"
            type="email"
            placeholder="Nhập email của bạn"
            className={styles.input}
          />
        </label>
        <button>Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterGiveNotification;
