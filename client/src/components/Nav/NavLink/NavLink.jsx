import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Toogle from "./Toogle/Toogle";
import style from "./../navCss/style.module.scss";
import SideNav from "./side-nav/sideNav";
import BackDrop from "../NavLink/Toogle/BackDrop";
import Auth from "./../../../classes/Auth";
function Navlink(props) {
  const [NavItems] = useState([
    {
      id: 0,
      Title: "Home",
      Link: "/",
    },
    {
      id: 1,
      Title: "Mobiles",
      Link: "/Mobile",
    },

    { id: 2, Title: "Monitors", Link: "/Monitor" },

    { id: 3, Title: "Laptops", Link: "/Laptop" },
  ]);
  const [AdminNav] = useState([
    {
      id: 0,
      Title: "Home",
      Link: "/",
    },
    {
      id: 1,
      Title: "Mobiles",
      Link: "/Mobile",
    },

    { id: 2, Title: "Monitors", Link: "/Monitor" },

    { id: 3, Title: "Laptops", Link: "/Laptop" },
    { id: 4, Title: "Add Product", Link: "/AddProduct" },
  ]);
  const [isAdmin, setAdmin] = useState(false);
  const checkAdmin = () => {
    return new Auth().isAuthenticate() && new Auth().isAdmin()
      ? setAdmin(true)
      : setAdmin(false);
  };
  useEffect(() => {
    checkAdmin();
  });
  const [sideNav, setSideNav] = useState(false);
  const onClick = () => {
    return setSideNav(true);
  };
  const close = () => {
    return setSideNav(false);
  };
  let data;
  if (isAdmin) {
    data = AdminNav.map((e) => {
      return (
        <li key={e.id}>
          <NavLink activeStyle={{ color: "red" }} exact to={e.Link}>
            {e.Title}
          </NavLink>
        </li>
      );
    });
  } else {
    data = NavItems.map((e) => {
      return (
        <li key={e.id}>
          <NavLink activeStyle={{ color: "red" }} exact to={e.Link}>
            {e.Title}
          </NavLink>
        </li>
      );
    });
  }

  return (
    <>
      <div className={`${style.NavLinks}`}>
        <ul>{data}</ul>
      </div>
      <Toogle Open={onClick} />
      <SideNav
        Links={isAdmin ? AdminNav : NavItems}
        Sidenav={sideNav}
        Close={close}
      />
      <BackDrop Sidenav={sideNav} Close={close} />
    </>
  );
}
export default withRouter(Navlink);
