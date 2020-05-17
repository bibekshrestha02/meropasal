import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Auth from "./../../../classes/Auth";
import Dropdown from "./dropdown/dropdown";
import Axios from "./../../../Axios";
function Navtop(props) {
  const [login, setLogIn] = useState(false);
  useEffect(() => {
    const status = new Auth().isAuthenticate;
    setLogIn(status);
    // console.log("hi");
  });
  const LogOut = () => {
    Axios.post("/user/logout").then((res) => {
      console.log(res.data);
    });
    return new Auth(props.history).LogOut();
  };
  let details = (
    <div className='NavTop'>
      <div className='row pt-2'>
        <div className='col-6'>
          <span className='text '>Welcome to our store!</span>
        </div>
        <div className='col-6 text-right '>
          <Link to='/Login'>LogIn</Link>
        </div>
      </div>
      <hr className='hr' />
    </div>
  );

  if (login) {
    return (details = (
      <>
        <div className='NavTop'>
          <div className='row pt-2'>
            <div className='col-6'>
              <span className='text '>Welcome to our store!</span>
            </div>
            <div className='col-6'>
              <div style={{ float: "right" }}>
                <Dropdown logOut={LogOut} />
              </div>
            </div>
          </div>

          <hr className='hr' />
        </div>
      </>
    ));
  }
  return details;
}
export default withRouter(Navtop);
