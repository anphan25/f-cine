import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled, Box } from '@mui/material';

const SliderStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  marginTop: 16,
  height: 550,

  '.swiper': {
    height: '100%',

    '.swiper-wrapper': {
      alignItems: 'center',

      '.swiper-slide': {
        width: '752px',
        height: '75%',
      },

      '.swiper-slide.swiper-slide-active': {
        transform: 'scale(1.3)',
      },
    },
  },
}));

const sliderList = [
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
  'https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg',
];

const Slider = () => {
  return (
    <SliderStyle>
      <Swiper
        spaceBetween={140}
        slidesPerView={'auto'}
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
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
                borderRadius: '14px',
              }}
            ></Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderStyle>
  );
};

export default Slider;
