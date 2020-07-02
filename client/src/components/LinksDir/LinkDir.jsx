import React from "react";
import style from "./style.module.scss";
import { NavLink } from "react-router-dom";
export default function LinkDir(props) {
  const activeClass = { color: "red" };
  return (
    <div className={`${style.LinkDir}`}>
      <span>
        <NavLink to='/'>
          <i className='fa fa-home'> </i>
        </NavLink>
        <i className={` fa `}> &#xf105; </i>
      </span>
      {props.firstLink && (
        <NavLink style={props.isActive && activeClass} to={props.firstLinkTo}>
          {props.firstLink}
        </NavLink>
      )}
      {props.secondLink && (
        <>
          <i className={` fa `}> &#xf105; </i>
          <NavLink style={{ color: "red" }} to={props.secondLinkTo}>
            {props.secondLink}
          </NavLink>
        </>
      )}
    </div>
  );
}
