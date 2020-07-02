import React from "react";
import { withRouter } from "react-router-dom";
import style from "./../css/carts.module.scss";
function CartsButtoms(props) {
  const checkOut = () => {
    return props.history.push("/checkout");
  };
  return (
    <div className={`${style.button}`}>
      <button
        className='btn btn-dark'
        onClick={() => {
          props.history.push("/");
        }}>
        Continue Shopping
      </button>
      <button className='btn btn-danger' onClick={checkOut}>
        CHECKOUT
      </button>
    </div>
  );
}
export default withRouter(CartsButtoms);
