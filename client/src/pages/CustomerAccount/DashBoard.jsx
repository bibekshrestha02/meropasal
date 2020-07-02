import React, { useEffect, useState } from "react";
import Links from "./Components/links";
import Account from "./Components/Account";
import Password from "./Components/Password";
import Order from "./Components/Orders";
import OrderList from "./Components/Orderslist";
import Axios from "./../../Axios";
import style from "./css/dashboard.module.scss";
import { Route, withRouter, Switch } from "react-router-dom";
import Spinner from "./../../components/Spinner/spinner";

function DashBoard(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get("/user/").then((res) => {
      const { data } = res;
      setFname(data.fname);
      setLname(data.lname);
      setEmail(data.email);
      setOrders(data.orderProduct);
      setIsLoading(false);
    });
  }, []);
  const links = (
    <Switch>
      <Route exact path={"/customer/account/"}>
        <Account fname={fname} lname={lname} email={email} />
      </Route>
      <Route path={"/customer/account/password"}>
        <Password />
      </Route>
      <Route path={"/customer/account/order"}>
        <Order orders={orders} />
      </Route>
      <Route path={"/customer/account/orderlist"}>
        <OrderList />
      </Route>
    </Switch>
  );
  return (
    <div className={`${style.dashBoard} row container-fluid mx-auto `}>
      <div className='col-lg-3 col-sm-12 '>
        <Links />
      </div>
      <div className='col-lg-9 col-sm-12'>
        {isLoading ? <Spinner /> : links}
      </div>
    </div>
  );
}
export default withRouter(DashBoard);
