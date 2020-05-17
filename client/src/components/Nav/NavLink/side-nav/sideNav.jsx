import React from "react";
import { Link } from "react-router-dom";
import "./../../navCss/style.css";
export default function sideNav(props) {
  let classes = "close";
  if (props.Sidenav) {
    classes = "side-nav";
  }

  return (
    <div className={classes}>
      <span className='closebtn' onClick={props.Close}>
        &times;
      </span>
      {props.Links.map((e) => {
        return (
          <div key={e.Link}>
            <Link className='link' to={e.Link}>
              {e.Title}
            </Link>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
