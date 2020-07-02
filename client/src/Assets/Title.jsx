import React from "react";
import style from "./css/style.module.scss";
export default function Title(props) {
  return (
    <div className={`${style.Title}`}>
      <span>{props.Title}</span>
      <hr />
    </div>
  );
}
