import React, { useState, useEffect } from "react";
import Title from "./../Assets/Title";
import SubTitle from "./../Assets/subTitle";
import OrderCards from "./../Assets/orderCards";
import Axios from "./../../../Axios";
import Spinner from "./../../../components/Spinner/spinner";
export default function Address() {
  const [orders, setOrders] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isitmes, setIsItems] = useState(false);

  useEffect(() => {
    Axios.get("/order/").then((res) => {
      const { data } = res;
      if (data.length === 0) {
        setLoading(false);
        return setIsItems(false);
      }
      setOrders(data);
      setLoading(false);
      setIsItems(true);
    });
  }, []);
  const getDeliver = (id) => {
    Axios.delete(`/order/${id}`).then((res) => {
      if (res.data.status) {
        return alert("Order Delivered");
      }
    });
    Axios.get("/order/").then((res) => {
      const { data } = res;
      if (data.length === 0) {
        setLoading(false);
        return setIsItems(false);
      }
      setOrders(data);
      setLoading(false);
      setIsItems(true);
    });
  };
  const noOrder = (
    <div className='alert alert-warning mt-2' role='alert'>
      <span style={{ fontSize: "20px" }}> &#9888;</span> You have no orders.
    </div>
  );

  let table;
  if (isLoading) {
    table = <Spinner />;
  }
  if (isitmes) {
    table = (
      <div>
        {orders.map((e, i) => {
          return (
            <div key={i}>
              <OrderCards
                email={e.userEmail}
                date={e.date}
                product={e.product}
                id={e._id}
                deliverFn={getDeliver}
              />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <Title title={"My Orders"} />
      <SubTitle de title={"Your Orders information"} />
      {isitmes ? table : noOrder}
      <hr />
    </div>
  );
}
