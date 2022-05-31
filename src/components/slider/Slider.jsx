import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Slider.css";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled, Box, Typography, Button } from "@mui/material";

const SliderStyle = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  marginTop: 16,
  height: 550,

  ".swiper": {
    height: "100%",

    ".swiper-wrapper": {
      alignItems: "center",

      ".swiper-slide": {
        width: "752px",
        height: "75%",
      },

      ".swiper-slide.swiper-slide-active": {
        transform: "scale(1.3)",
      },
    },
  },
}));

const OverlayStyle = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundImage:
    "linear-gradient(to bottom, rgba(255,0,0,0), rgba(0,0,0,0.8))",
  borderRadius: "14px",
  position: "relative",
}));

const SlideDescriptionStyle = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "10%",
  left: "5%",
}));

const sliderList = [
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
  "https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg",
];

const Slider = () => {
  return (
    <SliderStyle>
      <Swiper
        spaceBetween={140}
        slidesPerView={"auto"}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        grabCursor={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {sliderList.map((slider, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                backgroundImage: `url(${slider})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%",
                width: "100%",
                borderRadius: "14px",
              }}
            >
              <OverlayStyle>
                <SlideDescriptionStyle>
                  <Typography
                    // component="div"
                    sx={{
                      color: "#ffff",
                      fontWeight: 600,
                      fontSize: "40px",
                      lineHeight: "72px",
                      letterSpacing: "0.005em",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                    }}
                  >
                    End game
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      height: "40px",
                      width: "120px",
                      border: "1.5px solid",
                      borderRadius: "50px",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "neutral.0",
                      },
                    }}
                  >
                    View Detail
                  </Button>
                </SlideDescriptionStyle>
              </OverlayStyle>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderStyle>
  );
};

export default Slider;
