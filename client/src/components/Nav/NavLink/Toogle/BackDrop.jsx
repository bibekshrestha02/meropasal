import React from "react";
import "./../../navCss/style.css";
export default function BackDrop(props) {
  let classes = "close";
  if (props.Sidenav) {
    classes = "BackDrop";
  }

  return <div className={classes} onClick={props.Close}></div>;
}
