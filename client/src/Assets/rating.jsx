import React from "react";
import StarRatings from "react-star-ratings";
export default function Rating(props) {
  let star = (
    <StarRatings
      rating={props.Rating}
      starRatedColor='#ff9900'
      starDimension='20px'
      starEmptyColor='gray'
      starSpacing='1px'
      numberOfStars={5}
      name='rating'
    />
  );

  return star;
}
