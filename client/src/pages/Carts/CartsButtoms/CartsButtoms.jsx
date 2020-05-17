import React from "react";
import { withRouter } from "react-router-dom";

function CartsButtoms(props) {
  const backTo = () => {
    return props.history.push("/");
  };
  return (
    <div className=' row'>
      <div className='col-lg-4 mt-2 col-sm-12'>
        <button onClick={backTo} className=' btn  btn-block btn-success'>
          <i className='fa fa-arrow-left pr-3'></i> CONTINUE SHOPPING
        </button>
      </div>
      <div className='col-lg-4 mt-2 col-sm-12'>
        <button
          disabled={props.cartStatus}
          onClick={props.clearCarts}
          className='btn  btn-block btn-warning'>
          <i className='fa fa-trash pr-3'></i>CLEAR CARTS
        </button>
      </div>
      <div className='col-lg-4 mt-2 mb-2 col-sm-12'>
        <button
          disabled={props.cartStatus}
          onClick={props.closeHandler}
          className=' btn  btn-block btn-danger'>
          PROCCED TO CHECKOUT <i className='fa fa-arrow-right pl-3'></i>
        </button>
      </div>
    </div>
  );
}
export default withRouter(CartsButtoms);
