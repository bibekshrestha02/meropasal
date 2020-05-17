import React from "react";
import "./../css/carts.css";
import StripeCheckOut from "react-stripe-checkout";
import Axios from "./../../../Axios";
export default function Modal(props) {
  const total = props.subTotal + 100 + 20;
  // when stripe button is clicked
  const makePayment = (token) => {
    const body = {
      token,
      product: props.product,
    };
    console.log(body);
    return Axios.post("/order/payment", body)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={props.ModalHandler ? "CheckOutModel" : "close"}>
      <span className='closebtn' onClick={props.closeHandler}>
        &times;
      </span>
      <div className='text-center bg-danger'>
        <span className='header '>Procced to Pay</span>
      </div>
      <hr className='hr' />
      <div className='checkBody'>
        <span className='tag'>Subtotal:</span>
        <span className='prices'>
          Rs. <span>{props.subTotal}</span>
        </span>
        <br />
        <span className='tag'>DeliveryCharges:</span>
        <span className='prices'>
          Rs. <span>100</span>
        </span>
        <br />
        <span className='tag'>Taxes:</span>
        <span className='prices'>
          Rs. <span>20</span>
        </span>
        <br />
        <hr className='hr' />
        <span className='tag'>Total</span>
        <span className='prices'>
          Rs. <b>{total}</b>
        </span>
      </div>
      <div className='m-3'>
        {/* {console.log(process.env.REACT_APP_STRIPE_KEY)} */}
        {/* TODO stripe key */}
        <StripeCheckOut
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={makePayment}
          amount={total * 1}>
          <button className='btn btn-block btn-success'>Pay With Stripe</button>
        </StripeCheckOut>
      </div>
    </div>
  );
}
