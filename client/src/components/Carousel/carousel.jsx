import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./carousel Css/style.module.scss";
import CardsCarousel from "./cardsCarousel";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}
export default class SwipeToSlide extends Component {
  render() {
    const settings = {
      className: "center",
      infinite: true,
      dots: true,
      autoplay: true,
      centerPadding: "60px",
      slidesToShow: 1,
      swipeToSlide: true,
      speed: 500,

      autoplaySpeed: 5000,
      cssEase: "linear",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className='mb-4'>
        <Slider {...settings}>
          <CardsCarousel
            photo='/images/Electronics/laptops/asus.png'
            className={style.carousel}
            onDay='On Day Sales!'
            arrivals='New Arrivals'
            slogan="Prices Are Low–Now Don't Be Slow.Save Money."
          />
          <CardsCarousel
            className={style.carousel2}
            photo='/images/Electronics/laptops/macBookAir.png'
            onDay='New Collection'
            arrivals='Style Looks'
            slogan='From Our creative community.'
          />
        </Slider>
      </div>
    );
  }
}

/*  */
