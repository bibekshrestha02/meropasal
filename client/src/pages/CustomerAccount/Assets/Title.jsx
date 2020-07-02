import React from "react";
import style from "./../css/Assets.module.scss";
export default function Title(props) {
  return (
    <div className={style.Title}>
      <span>{props.title}</span>
    </div>
  );
}
