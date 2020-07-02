import React from "react";
import style from "./css/style.module.scss";
export default function Price(props) {
  let price = (
    <div>
      <span className={style.price}>Rs. {props.Price}</span>
    </div>
  );

  return price;
}
