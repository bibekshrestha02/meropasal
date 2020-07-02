import React from "react";
import style from "./../../navCss/style.module.scss";
export default function BackDrop(props) {
  let classes = style.close;
  if (props.Sidenav) {
    classes = style.BackDrop;
  }

  return <div className={classes} onClick={props.Close}></div>;
}
