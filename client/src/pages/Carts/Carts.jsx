import React, { useState, useEffect, useContext } from "react";
import CartTable from "./CartsTable/cartsTable";
import Title from "./../../pages/CustomerAccount/Assets/Title";
import Axios from "./../../Axios";
import Spinner from "./../../components/Spinner/spinner";
import Button from "./CartsButtoms/CartsButtoms";
import Linkdir from "./../../components/LinksDir/LinkDir";
import { Carts } from "./../../Store/CartStore";

export default function Cart() {
  const [isItems, setIsItems] = useState(false);
  const [CartItems, setItems] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [loading, setLoading] = useState(true);
  const setCartNumber = useContext(Carts);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    Axios.get("cartApi/carts").then((res) => {
      if (res.data.CartsNumber === 0) {
        setLoading(false);
        return setIsItems(false);
      }
      setCartNumber[1](res.data.CartsNumber);
      setSubTotal(res.data.subTotal);
      setItems(res.data.Carts);
      setLoading(false);
      setIsItems(true);
    });
  }, [setCartNumber]);

  //  single items from carts
  const itemRemove = (title) => {
    Axios.delete(`cartApi/carts/${title}`).then((res) => {
      if (res.data.CartsNumber === 0) {
        setCartNumber[1](res.data.CartsNumber);

        setLoading(false);
        return setIsItems(false);
      }
      setCartNumber[1](res.data.CartsNumber);

      setSubTotal(res.data.subTotal);
      setItems(res.data.Carts);
      setLoading(false);
      setIsItems(true);
    });
  };

  let details;
  if (loading) {
    details = <Spinner />;
  } else if (isItems) {
    details = (
      <div>
        <CartTable
          itemRemove={itemRemove}
          subTotal={subTotal}
          CartItems={CartItems}
        />
        <Button />
      </div>
    );
  }
  const emptyCartsMessage = (
    <div style={{ height: "50vh" }}>
      <div className='alert alert-warning mt-2' role='alert'>
        <span style={{ fontSize: "20px" }}> &#9888;</span> You have placed no
        orders.
      </div>
    </div>
  );

  return (
    <>
      <Linkdir firstLink='Carts' firstLinkTo='/Cart' isActive />
      <Title title='Shopping Carts' />
      {!isItems ? emptyCartsMessage : details}
    </>
  );
}
