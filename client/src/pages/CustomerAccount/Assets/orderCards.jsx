import React, { useState } from "react";
import style from "./../css/Assets.module.scss";
export default function OrderCards(props) {
  const [isToggle, setToggle] = useState(false);
  const toggleHandler = () => {
    setToggle((pre) => !pre);
  };
  return (
    <div className={`${style.orderCards}  container-fluid mt-2`}>
      <div className={`${style.collpasible} row justify-content-between  `}>
        <div className='col-lg-4 col-sm-6 text-left'>
          <span className={`${style.title}`}>Customer Email</span>
          <br />
          <span className={`${style.text}`}>{props.email}</span>
        </div>
        <div className='col-lg-4 col-sm-6'>
          <span className={`${style.title}`}>Date</span>
          <br />
          <span className={`${style.text}`}>
            {new Date(props.date).toDateString()}
          </span>
        </div>
        <div className='col-lg-4 col-sm-12 my-auto text-right'>
          <button
            className='btn  btn-sm btn-success'
            onClick={() => props.deliverFn(props.id)}>
            Deliver Order
          </button>
          <span className=' text-sm-center ml-2' onClick={toggleHandler}>
            {isToggle ? <span>&#9650;</span> : <span>&#9660;</span>}
          </span>
        </div>
      </div>

      {isToggle && (
        <div className={`${style.collpasibleText} container-fluid`}>
          <table className='table mt-1'>
            <thead>
              <tr>
                <th>Title</th>

                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {props.product.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <span>{e.Title}</span>
                    </td>
                    <td>{e.Order}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
