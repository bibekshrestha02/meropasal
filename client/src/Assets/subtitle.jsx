import React from "react";
import style from "./css/style.module.scss";
export default function Subtitle(props) {
  return (
    <div className={`${style.subtitle}`}>
      <h1>{props.Subtitle}</h1>
      <hr />
    </div>
  );
}
