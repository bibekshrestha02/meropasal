import React from "react";
import "../../navCss/style.css";
export default function Toogle(props) {
  return (
    <div className='Toogle'>
      <div className='Menu' onClick={props.Open}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='Categories'>
        <span>Categories</span>
      </div>
    </div>
  );
}
