import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Title from "./../Assets/subTitle";
import style from "./../css/link.module.scss";
import Auth from "./../../../classes/Auth";
export default function Links(props) {
  const [links] = useState([
    {
      name: "Account",
      to: "/customer/account/",
    },
    {
      name: "Password",
      to: "/customer/account/password",
    },
    {
      name: "Order",
      to: "/customer/account/order",
    },
  ]);
  const [adminLinks] = useState([
    {
      name: "Account",
      to: "/customer/account/",
    },
    {
      name: "Password",
      to: "/customer/account/password",
    },
    {
      name: "Orders",
      to: "/customer/account/orderlist",
    },
  ]);
  const [isAdmin, setAdmin] = useState();
  useEffect(() => {
    new Auth().isAdmin() ? setAdmin(true) : setAdmin(false);
  }, []);
  const [isActive, setActive] = useState(true);
  const toogleHandler = () => {
    return setActive((pre) => !pre);
  };
  let data;
  if (isAdmin) {
    data = adminLinks.map((link, i) => {
      return (
        <span key={i}>
          <NavLink exact activeClassName={style.activeClassName} to={link.to}>
            {link.name}
          </NavLink>
        </span>
      );
    });
  } else {
    data = links.map((link, i) => {
      return (
        <span key={i}>
          <NavLink exact activeClassName={style.activeClassName} to={link.to}>
            {link.name}
          </NavLink>
        </span>
      );
    });
  }
  return (
    <div className={`${style.link}`}>
      <Title onClick={toogleHandler} title='Dashboard' toogle />
      <div
        className={`${isActive ? style.linksItemsDis : style.linksItemsAct}`}>
        {data}
      </div>
    </div>
  );
}
