import React from "react";
import StarRatings from "react-star-ratings";
// import "./css/style.css";
export default function Rating(props) {
  let star = (
    <StarRatings
      rating={props.Rating}
      starRatedColor='yellow'
      starDimension='20px'
      starSpacing='1px'
      numberOfStars={5}
      name='rating'
    />
  );
  if (props.loading) {
    star = (
      <StarRatings
        rating={5}
        starRatedColor='gray'
        starDimension='20px'
        starSpacing='1px'
        numberOfStars={5}
        name='rating'
      />
    );
  }
  return star;
}
