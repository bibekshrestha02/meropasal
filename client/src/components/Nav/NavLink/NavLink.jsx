import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Toogle from "./Toogle/Toogle";
import "./../navCss/style.css";
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
      Title: "Smartphones",
      Link: "/Smartphones",
    },

    { id: 2, Title: "Monitors", Link: "/Monitor" },

    { id: 3, Title: "Computers", Link: "/Computer" },
  ]);
  const [AdminNav] = useState([
    {
      id: 0,
      Title: "Home",
      Link: "/",
    },
    {
      id: 1,
      Title: "Smartphones",
      Link: "/Smartphones",
    },

    { id: 2, Title: "Monitors", Link: "/Monitor" },

    { id: 3, Title: "Computers", Link: "/Computer" },
    { id: 4, Title: "Add Product", Link: "/productAdd" },
    { id: 5, Title: "Delete Product", Link: "/productDelete" },
    { id: 6, Title: "Update Product", Link: "/productUpdate" },
  ]);
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    if (
      new Auth(props.history).isAuthenticate() &&
      new Auth(props.history).isAdmin()
    ) {
      setAdmin(true);
    }
  }, [props.history]);
  const [sideNav, setSideNav] = useState(false);
  const onClick = () => {
    return setSideNav(true);
  };
  const close = () => {
    return setSideNav(false);
  };
  return (
    <>
      <div className='Nav-Links'>
        <ul>
          {isAdmin
            ? AdminNav.map((e) => {
                return (
                  <li key={e.id} className=''>
                    <NavLink exact to={e.Link}>
                      {e.Title}
                    </NavLink>
                  </li>
                );
              })
            : NavItems.map((e) => {
                return (
                  <li key={e.id} className=''>
                    <NavLink exact to={e.Link}>
                      {e.Title}
                    </NavLink>
                  </li>
                );
              })}
        </ul>
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
