import React from "react";
// import Swiper, { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./sliderStyle.css";

import Swiper, { Autoplay, Pagination, Navigation } from "swiper";

const Slider = () => {
  //   const swiper = new Swiper(".swiper", {
  //     // Optional parameters
  //     direction: "horizontal",
  //     loop: true,

  //     // If we need pagination
  //     pagination: {
  //       el: ".swiper-pagination",
  //     },

  //     // Navigation arrows
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },

  //     // And if we need scrollbar
  //     scrollbar: {
  //       el: ".swiper-scrollbar",
  //     },
  //   });

  return (
    <>
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
          ...
        </div>

        <div className="swiper-pagination"></div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>

        <div className="swiper-scrollbar"></div>
      </div>

      <script src="./slider.js"></script>
    </>
  );
};

export default Slider;
