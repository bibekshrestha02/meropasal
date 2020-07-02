import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dropdown.css";
import Auth from "../../../../classes/Auth";
export default function Dropdown(props) {
  const [show, setShow] = useState(false);
  const [isAdmin, setAdmin] = useState();
  useEffect(() => {
    new Auth().isAuthenticate() && new Auth().isAdmin()
      ? setAdmin(true)
      : setAdmin(false);
  }, []);
  let Tags = "User";

  if (isAdmin) {
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
        <li>
          <Link to={"/customer/account"} onClick={classHandler}>
            My Account
          </Link>
        </li>
        <li onClick={props.logOut}>LogOut</li>
      </ul>
    </div>
  );
}
