import React from "react";
import style from "./css/style.module.scss";
export default function LogInTitle(props) {
  return <div className={`${style.loginTitle} text-center`}>{props.Title}</div>;
}
