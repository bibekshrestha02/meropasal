import React from "react";
import "./css/style.css";
export default function Title(props) {
  return (
    <div className='Title'>
      <span>{props.Title}</span>
      <hr />
    </div>
  );
}
