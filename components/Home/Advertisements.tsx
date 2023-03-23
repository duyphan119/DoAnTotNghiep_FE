import { AdvertisementModel } from "@/models";
import { Box, Container } from "@mui/material";
import Link from "next/link";
import { FC, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageFill } from "../common";

type Props = {
  advertisements: AdvertisementModel[];
};

const Advertisements: FC<Props> = ({ advertisements }) => {
  if (advertisements.length === 0) return <Fragment></Fragment>;
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          ".swiper": {
            width: "100%",
          },
        }}
      >
        <Swiper slidesPerView={1}>
          {advertisements.map((adv) => {
            return (
              <SwiperSlide key={adv.id}>
                <Link href={adv.href} rel="preloaded" as="image">
                  <ImageFill src={adv.path} alt="banner" height="546px" />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Container>
  );
};

export default Advertisements;
