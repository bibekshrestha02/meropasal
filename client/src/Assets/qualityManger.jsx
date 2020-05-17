import React from "react";
import "./css/style.css";
export default function QualityManger(props) {
  return (
    <span className='qualityManager'>
      <span className='btn btn-secondary ' onClick={props.Decrease}>
        -
      </span>
      <span className='number'>
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
