import fbIcon from "@/public/fb-footer-icon.svg";
import insIcon from "@/public/ins-footer-icon.svg";
import tiktokIcon from "@/public/tiktok-footer-icon.svg";
import twitterIcon from "@/public/twitter-footer-icon.svg";
import youtubeIcon from "@/public/youtube-footer-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "./_style.module.scss";

type Props = {};

const icons: any[] = [fbIcon, tiktokIcon, twitterIcon, youtubeIcon, insIcon];

const About: FC<Props> = () => {
  return (
    <div className={styles.about}>
      <p className={styles.overview}>
        Với các giải pháp công nghệ tốt nhất, Shop là tất cả những gì bạn cần để
        xây dựng thương hiệu online, thành công trong bán lẻ và marketing đột
        phá.
      </p>
      <ul className={styles.socialIcons}>
        {icons.map(({ src, height, width }: any, index: number) => {
          return (
            <li key={index} className={styles.socialIcon}>
              <Link href="/" as="image" rel="preloaded">
                <Image
                  src={src}
                  width={width - 8}
                  height={height - 8}
                  alt=""
                  priority={true}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default About;
