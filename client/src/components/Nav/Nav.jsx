import React from "react";
import Navtop from "./Nav-Top/Nav-top";
import NavBrand from "./Nav-Brand/NavBrand";
import NavLink from "./NavLink/NavLink";
import style from "./navCss/style.module.scss";

export default function Nav() {
  return (
    <div className={`${style.Nav}`}>
      <Navtop />
      <NavBrand />
      <NavLink />
    </div>
  );
}
