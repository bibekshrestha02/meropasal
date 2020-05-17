import React, { useState, useEffect } from "react";
import "./css/account.css";
import Axios from "./../../Axios";
import Spinner from "./../../components/Spinner/spinner";
export default function Account() {
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/user/data").then((res) => {
      setName(res.data.fname + " " + res.data.lname);
      // setLoading(false);
    });
    Axios.get("cartApi/carts").then((res) => {
      console.log(res.data);
      if (res.data.status === "fail") {
        setOrder(false);
        return setLoading(false);
      }
      setOrder(res.data.Carts);
      setOrder(false);

      setLoading(false);
    });
  }, []);
  let result = <Spinner />;
  if (!loading) {
    result = (
      <div className='CustomerDashBoard'>
        <h1 className='text-center titleUser'>User DashBoard</h1>
        <span className='subTitleUser'>User Information</span>
        <hr className='hr' />
        <span style={{ fontSize: "20px" }}>Welcome,</span>
        <span className='contactUser'> {name}</span>
        <br />
        <span className='subTitleUser'> Your Order Items</span>
        <hr className='hr' />
        {order ? (
          <div className='OrderTable'>
            <table className='table mt-1'>
              <thead>
                <tr>
                  <th>Itmes</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img src={e.Photo} alt={e.Title} width='90px' />
                      </td>
                      <td>
                        <span>{e.Title}</span>
                      </td>
                      <td>
                        <span>{e.Price}</span>
                      </td>
                      <td>
                        <span>{e.Order}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='EmptyOrderTable'>
            <span className='text-warning'>No items Ordered</span>
          </div>
        )}
      </div>
    );
  }
  return result;
}
