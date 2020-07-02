import React from "react";
import style from "../../navCss/style.module.scss";
export default function Toogle(props) {
  return (
    <div className={`${style.Toogle}`}>
      <div className={`${style.Menu}`} onClick={props.Open}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`${style.Categories}`}>
        <span>Categories</span>
      </div>
    </div>
  );
}
