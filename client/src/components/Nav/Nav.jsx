import React from "react";
import Navtop from "./Nav-Top/Nav-top";
import NavBrand from "./Nav-Brand/NavBrand";
import NavLink from "./NavLink/NavLink";
import "./navCss/style.css";

export default function Nav() {
  return (
    <div className='Nav'>
      <Navtop />
      <NavBrand />
      <NavLink />
    </div>
  );
}
