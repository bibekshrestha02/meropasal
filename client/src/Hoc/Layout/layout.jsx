import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "./../../components/Footer/Footer";
import "./style.css";
import { CartStore } from "../../Store/CartStore";
export default function layout(props) {
  return (
    <div>
      <CartStore>
        <Nav />
        <div className='body'>{props.children}</div>
        <Footer />
      </CartStore>
    </div>
  );
}
