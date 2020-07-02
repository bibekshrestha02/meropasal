import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Auth from "./../../../classes/Auth";
import Dropdown from "./dropdown/dropdown";
import Axios from "./../../../Axios";
import style from "./../navCss/style.module.scss";
function Navtop(props) {
  const [login, setLogIn] = useState(false);
  const checkLogIn = () => {
    return new Auth().isAuthenticate() ? setLogIn(true) : setLogIn(false);
  };
  useEffect(() => {
    checkLogIn();
  });

  const LogOut = () => {
    Axios.post("/user/logout");
    return new Auth(props.history).LogOut();
  };
  let details = (
    <div className={style.navTop}>
      <div className='row pt-2'>
        <div className='col-6'>
          <span className={style.text}>Welcome to our store!</span>
        </div>
        <div className='col-6 text-right '>
          <Link to='/Login'>LogIn</Link>
        </div>
      </div>
      <hr className={style.hr} />
    </div>
  );

  if (login) {
    return (details = (
      <>
        <div className={style.navTop}>
          <div className='row pt-2'>
            <div className='col-6'>
              <span className={style.text}>Welcome to our store!</span>
            </div>
            <div className='col-6'>
              <div style={{ float: "right" }}>
                <Dropdown logOut={LogOut} />
              </div>
            </div>
          </div>

          <hr className={style.hr} />
        </div>
      </>
    ));
  }
  return details;
}
export default withRouter(Navtop);
