import React, { useState, useEffect } from "react";
import Axios from "./../Axios";
import Auth from "./../classes/Auth";
export const Carts = React.createContext();

export const CartStore = (props) => {
  const [cartsNmber, setCartNumber] = useState(0);
  useEffect(() => {
    if (new Auth().isAuthenticate()) {
      Axios.get("cartApi/carts").then((res) => {
        if (res.data.status === "fail") {
          return setCartNumber(0);
        }
        setCartNumber(res.data.Carts.length);
      });
    }
  });
  return (
    <Carts.Provider value={[cartsNmber, setCartNumber]}>
      {props.children}
    </Carts.Provider>
  );
};
