import React, { useState, useEffect } from "react";
import Axios from "./../Axios";
import Auth from "./../classes/Auth";
export const Carts = React.createContext();

export const CartStore = (props) => {
  const [cartsNmber, setCartNumber] = useState(0);
  const isCartsItems = () => {
    if (new Auth().isAuthenticate()) {
      Axios.get("cartApi/carts").then((res) => {
        setCartNumber(res.data.CartsNumber);
      });
    } else {
      setCartNumber(0);
    }
  };
  useEffect(() => {
    isCartsItems();
  });
  return (
    <Carts.Provider value={[cartsNmber, setCartNumber]}>
      {props.children}
    </Carts.Provider>
  );
};
