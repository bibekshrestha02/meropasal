import "./carousel Css/style.css";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
      <div className='container-fluid'>
        <Slider {...settings}>
          <div className='carousel mt-1'>
            <div className='row'>
              <div className='col-6 text text-left '>
                <span className='onDay'>On Day Sales!</span>
                <br />
                <span className='arrivals'>New Arrivals</span>
                <br />
                <span className='slogan'>
                  Prices Are Low–Now Don't Be Slow.Save Money.
                </span>
              </div>
              <div className='col-6'>
                <img
                  className='photo'
                  src='/images/Electronics/laptops/asus.png'
                  alt='img'
                />
              </div>
            </div>
          </div>
          <div>
            <div className='row carousel2 mt-1'>
              <div className='col-6'>
                <span className='onDay'>New Collection</span>
                <br />
                <span className='arrivals'>Style Looks</span>
                <br />
                <span className='slogan'> From Our creative community.</span>
              </div>
              <div className='col-6 text-right'>
                <img
                  src='/images/Electronics/laptops/macBookAir.png'
                  alt=''
                  className='photo'
                />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

/*  */
