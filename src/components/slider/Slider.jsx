import React, { useState } from "react";
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
        transform: "scale(1.2)",
      },
    },
  },
}));

const OverlayStyle = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundImage:
    "linear-gradient(to bottom, rgba(255,0,0,0), rgba(31,32,35,0.8))",
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

const Slider = (props) => {
  const [movies, setMovies] = useState([]);

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
        {!props.moviePosterList
          ? ""
          : props.moviePosterList.map((slider, index) => (
              <SwiperSlide>
                <Box
                  key={index}
                  movie-id={slider.movieId}
                  sx={{
                    backgroundImage: `url(${slider.coverImgURL})`,
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
                        {slider.title}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          height: "40px",
                          width: "120px",
                          border: "1.5px solid",
                          borderRadius: "50px",
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
