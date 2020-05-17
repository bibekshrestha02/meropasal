import React, { useState, useEffect } from "react";
import CartTable from "./CartsTable/cartsTable";
import CartsButtom from "./CartsButtoms/CartsButtoms";
import CheckOutModel from "./CheckOutModel/modal";
import FullScrenModel from "./CheckOutModel/fullScreenModel";
import Axios from "./../../Axios";
import Spinner from "./../../components/Spinner/spinner";
import "./css/carts.css";
export default function Cart() {
  const [isItms, setIsItmes] = useState(true);
  const [CartItems, setItems] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [ModalHandler, setModalHandler] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    Axios.get("cartApi/carts").then((res) => {
      if (res.data.status === "fail") {
        setLoading(true);
        return setItems(true);
      }
      setSubTotal(res.data.subTotal);
      setItems(res.data.Carts);
      setLoading(true);
      setIsItmes(false);
    });
  }, []);

  const closeHandler = () => {
    setModalHandler((e) => !e);
  };
  const clearCarts = () => {
    Axios.delete(`/cartApi/carts`)
      .then((res) => {
        setLoading(true);
        setIsItmes(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // TODO:deleting single items from carts
  const itemRemove = (title) => {
    Axios.delete(`cartApi/carts/${title}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === "fail") {
          setLoading(true);
          setIsItmes(true);
          return setItems(false);
        }
        setSubTotal(res.data.subTotal);
        setItems(res.data.Carts);
        setLoading(true);
        setIsItmes(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let details;
  if (!loading) {
    details = <Spinner />;
  }

  if (loading && !isItms) {
    details = <CartTable itemRemove={itemRemove} CartItems={CartItems} />;
  }
  return (
    <>
      <div className='cartTitle'>
        <h3>
          <b>Shopping Carts</b>
        </h3>
      </div>
      <div className='Cart container-fluid '>
        <div>{isItms ? <span>No Items in Carts</span> : details}</div>
      </div>
      <CartsButtom
        cartStatus={isItms}
        closeHandler={closeHandler}
        clearCarts={clearCarts}
      />
      <CheckOutModel
        subTotal={subTotal}
        product={CartItems}
        ModalHandler={ModalHandler}
        closeHandler={closeHandler}
      />
      <FullScrenModel ModalHandler={ModalHandler} closeHandler={closeHandler} />
    </>
  );
}
