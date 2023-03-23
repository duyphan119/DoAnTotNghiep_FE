import { GroupProductHeaderModel } from "@/models";
import { publicRoutes } from "@/utils/routes";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./_style.module.scss";

type Props = {
  groupProductHeaders: GroupProductHeaderModel[];
};

const GroupProductHeaders: FC<Props> = ({ groupProductHeaders }) => {
  const [header, setHeader] = useState<GroupProductHeaderModel>();

  const headers = useMemo(() => {
    return groupProductHeaders
      .filter((item) => item.items.length > 0)
      .map((item) => ({
        ...item,
        items: item.items.filter((subItem) => subItem.thumbnail !== ""),
      }));
  }, [groupProductHeaders]);

  useEffect(() => {
    if (headers.length > 0) {
      setHeader(headers[0]);
    }
  }, [headers]);

  return (
    <Container maxWidth="lg">
      <Box className={`flex-center ${styles.groupProductHeadings}`}>
        {headers.map((item) => {
          const isActive = header && item.name === header.name;
          return (
            <Box
              className={`${styles.groupProductHeading} ${
                isActive ? styles.active : ""
              }`}
              key={item.name}
              onClick={() => setHeader(item)}
            >
              {item.name}
            </Box>
          );
        })}
      </Box>
      {header ? (
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {header.items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Link href={publicRoutes.products(item.slug)}>
                  <Box className={`${styles.groupProduct} flex-center`}>
                    <div className={`${styles.thumbnailWrapper} flex-center`}>
                      <Image
                        src={item.thumbnail}
                        alt=""
                        height={64}
                        width={56}
                        priority={true}
                      />
                    </div>
                    <span>{item.name}</span>
                  </Box>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </Container>
  );
};

export default GroupProductHeaders;
