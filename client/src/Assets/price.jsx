import React from "react";

export default function Price(props) {
  let price = (
    <div>
      <span className='price'>
        Rs.<span className='priceTag'>{props.Price}</span>
      </span>
    </div>
  );

  return price;
}
