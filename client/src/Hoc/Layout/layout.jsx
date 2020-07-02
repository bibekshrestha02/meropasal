import React from "react";
import Nav from "../../components/Nav/Nav";
import style from "./style.module.scss";
import { CartStore } from "../../Store/CartStore";
import Footer from "./../../components/Footer/Footer";
export default function layout(props) {
  return (
    <div className={style.layOut}>
      <CartStore>
        <Nav />
        <div className={style.body}>{props.children}</div>
      </CartStore>
      <Footer />
    </div>
  );
}
