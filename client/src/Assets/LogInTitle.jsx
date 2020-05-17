import React from "react";
import "./css/style.css";
export default function LogInTitle(props) {
  return (
    <div className='loginTitle text-center'>
      <span>{props.Title}</span>
      <hr />
    </div>
  );
}
