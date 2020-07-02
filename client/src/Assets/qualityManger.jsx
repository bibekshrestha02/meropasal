import React from "react";
import style from "./css/style.module.scss";
export default function QualityManger(props) {
  return (
    <span className={`${style.qualityManager}`}>
      <span className='btn btn-secondary ' onClick={props.Decrease}>
        -
      </span>
      <span className={`${style.number}`}>
        <b>{props.number}</b>
      </span>

      <span
        className='btn btn-secondary'
        onClick={() => props.Increase(props.ItemsLeft)}>
        +
      </span>
    </span>
  );
}
