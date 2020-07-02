import React, { useState, useEffect } from "react";
import Title from "./../Assets/Title";
import SubTitle from "./../Assets/subTitle";

import OrderTable from "./../Assets/OrderTable";
export default function Address(props) {
  const [isOrder, setisOrder] = useState(false);
  useEffect(() => {
    if (props.orders.length === 0) {
      return setisOrder(false);
    } else {
      return setisOrder(true);
    }
  }, [props.orders.length]);
  const noOrder = (
    <div className='alert alert-warning mt-2' role='alert'>
      <span style={{ fontSize: "20px" }}> &#9888;</span> You have placed no
      orders.
    </div>
  );

  const table = <OrderTable order={props.orders} />;

  return (
    <div>
      <Title title={"My Orders"} />
      <SubTitle de title={"Your Orders information"} />
      {isOrder ? table : noOrder}
    </div>
  );
}
