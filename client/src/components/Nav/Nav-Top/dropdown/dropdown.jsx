import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./dropdown.css";
import Auth from "../../../../classes/Auth";
export default function Dropdown(props) {
  const [show, setShow] = useState(false);
  let Tags = "User";

  if (new Auth().isAdmin()) {
    Tags = "Admin";
  }
  const classHandler = () => {
    setShow((pre) => !pre);
  };
  return (
    <div className='dropdown '>
      <span
        className=' dropdown-toggle'
        type='button'
        id='menu1'
        onClick={classHandler}
        data-toggle='dropdown'>
        {Tags}

        <span className='caret'></span>
      </span>
      <ul
        className={
          show ? "dropdown-menu dropdown-menu-right show " : "dropdown-menu "
        }
        role='menu'
        aria-labelledby='menu1'>
        <li className='dropdown-item'>
          <Link to={"/customer/account"}>My Account</Link>
        </li>
        <li className='dropdown-item' onClick={props.logOut}>
          LogOut
        </li>
      </ul>
    </div>
  );
}
