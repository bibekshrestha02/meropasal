import React, { useContext, useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { Carts } from "./../../../Store/CartStore";
import Auth from "../../../classes/Auth";
import style from "./../navCss/style.module.scss";
function NavBrand(props) {
  const [cartsNmber] = useContext(Carts);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const searchPage = () => {
    if (searchValue === "") {
      return searchRef.current.focus();
    } else {
      props.history.push(`/search/?product=${searchValue}`);
    }
  };
  const searchValueHandler = (e) => {
    setSearchValue(e.target.value);
    e.preventDefault();
  };
  return (
    <div className={`${style.NavBrand} row`}>
      <div className=' col-lg-4 col-md-4 pt-3 col-sm-12 '>
        <Link className={`${style.Carts} `} to='/Cart'>
          <i className={`fa fa-shopping-cart ${style.icon} `} />
          <span className={`${style.border} `}></span>
          <span className={`${style.CartText} `}>
            <b>{new Auth().isAuthenticate ? cartsNmber : 0}</b> My Carts
          </span>
        </Link>
      </div>
      <div className='col-lg-4 col-md-4 col-sm-12 '>
        <img src='/images/Logo.png' alt='Brand Logo' width='200px' />
      </div>
      <div
        className={`${style.formsearch} col-lg-4 col-md-4 col-sm-12 pt-lg-3 pt-md-3`}>
        <input
          ref={searchRef}
          type='text'
          value={searchValue}
          placeholder='Search Items'
          id={style.Search}
          onChange={searchValueHandler}
        />
        <button className={`${style.button} `} onClick={searchPage}>
          <i className='fa fa-search'></i>
        </button>
      </div>
    </div>
  );
}
export default withRouter(NavBrand);
