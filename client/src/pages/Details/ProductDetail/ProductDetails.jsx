import React, { useState, useContext } from "react";
import Star from "../../../Assets/rating";
import Price from "../../../Assets/price";
import Manager from "../../../Assets/qualityManger";
import SubTitle from "../../../Assets/subtitle";
import { withRouter } from "react-router-dom";
import Auth from "../../../classes/Auth";
import Axios from "./../../../Axios";
import style from "./ProductDetails.module.scss";
import { Carts } from "./../../../Store/CartStore";
function ProductDetails(props) {
  const [number, setNumber] = useState(1);
  const setCartNumber = useContext(Carts);
  const Increae = (limits) => {
    if (number >= limits) {
      setNumber(limits);
    } else setNumber(number + 1);
  };
  const Decrease = () => {
    if (number <= 1) {
      setNumber(1);
    } else setNumber(number - 1);
  };
  const addItemsFn = () => {
    if (!new Auth(props.history).isAuthenticate()) {
      return props.history.push("/login");
    }
    const data = {
      order: number,
      productId: props.id,
    };
    Axios.post("/cartApi/carts", data).then((res) => {
      const { CartsNumber } = res.data;
      setCartNumber[1](CartsNumber);
    });
  };
  const closeHandler = () => {
    if (!new Auth(props.history).isAuthenticate()) {
      return props.history.push("/login");
    }
  };
  // deleting the product
  const deleteProduct = (id) => {
    alert("Are You Sure");
    Axios.delete(`/api/Products/${id}`).then((res) => {
      alert("Delted");
      props.history.push("/");
    });
  };

  let Details = "loading";

  if (props.State) {
    const data = props.Data;
    Details = (
      <div className={`${style.Details} row pl-3 pr-3`}>
        <div className={`${style.image} col-lg-3 col-md-4 col-sm-12 mx-auto `}>
          <img className={`${style.photo}`} src={data.Photo} alt='Product' />
        </div>
        <div className='col-lg-9 col-md-7 col-sm-12 '>
          <SubTitle Subtitle={data.Title} />
          <Star Rating={data.Rating} />
          <div className='mt-3'>
            <Price Price={data.Price} />
          </div>
          <div className={`${style.quality} mt-1`}>
            <span className={`${style.Tags}`}>Availability</span> :
            <span className={`${style.quality}`}>
              <b> {data.ItemsLeft}</b> in stock
            </span>
          </div>
          <div className={`${style.manager}`}>
            <span>
              Quality :<span> </span>
              <Manager
                ItemsLeft={data.ItemsLeft}
                number={number}
                Increase={Increae}
                Decrease={Decrease}
              />
            </span>
          </div>
          <div className='mt-3 mb-3 row container-fluid'>
            <span className='btn btn-success mr-2' onClick={closeHandler}>
              Buy Now
            </span>
            <button className='btn btn-warning' onClick={addItemsFn}>
              {"Add to Carts"}
            </button>
            {new Auth().isAuthenticate() &&
            new Auth(props.history).isAdmin() ? (
              <>
                <span
                  className='btn btn-primary ml-4'
                  onClick={() =>
                    props.history.push(`/productUpdate/${data._id}`)
                  }>
                  Update
                </span>
                <span
                  className='btn btn-danger ml-4'
                  onClick={() => {
                    deleteProduct(data._id);
                  }}>
                  Delete
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return Details;
}

export default withRouter(ProductDetails);
