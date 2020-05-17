import React from "react";
import "./css/style.css";
export default function Subtitle(props) {
  return (
    <div className='subtitle'>
      <span>{props.Subtitle}</span>
      <hr />
    </div>
  );
}
