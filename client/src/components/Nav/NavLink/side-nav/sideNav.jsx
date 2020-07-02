import React from "react";
import { NavLink } from "react-router-dom";
import style from "./../../navCss/style.module.scss";
export default function sideNav(props) {
  let classes = style.close;
  if (props.Sidenav) {
    classes = style.sidenav;
  }

  return (
    <div className={classes}>
      <span className={`${style.closebtn}`} onClick={props.Close}>
        &times;
      </span>
      {props.Links.map((e) => {
        return (
          <div key={e.Link}>
            <NavLink activeClassName={style.active} to={e.Link}>
              {e.Title}
            </NavLink>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
