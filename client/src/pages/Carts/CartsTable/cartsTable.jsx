import React from "react";
import style from "./../css/carts.module.scss";
export default function CartsTable(props) {
  const commaConverter = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <div className={`${style.table} table-responsive`}>
        <table className='table mt-1 border'>
          <thead>
            <tr className='table-active'>
              <th className='border'>Image</th>
              <th className='border'>Title</th>
              <th className='border'>Quantity</th>
              <th className='border'>Unit Price</th>
              <th className='border'>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.CartItems.map((e, i) => {
              return (
                <tr key={i}>
                  <td className='border'>
                    <div className=' text-center'>
                      <img
                        className='border text-center'
                        src={e.Photo}
                        alt={e.Title}
                        width='50px'
                      />
                    </div>
                  </td>
                  <td className={`${style.title} border`}>
                    <span>
                      <b>{e.Title}</b>
                    </span>
                  </td>
                  <td className='border text-center'>
                    <span>{e.Order}</span>
                  </td>
                  <td className='border'>
                    <span>{commaConverter(e.Price)}</span>
                  </td>
                  <td className='border'>
                    <span>{commaConverter(e.Total)}</span>
                  </td>
                  <td className='border text-center'>
                    <span
                      className={`${style.clseBtn}`}
                      onClick={() => {
                        props.itemRemove(e.Title);
                      }}>
                      &times;
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={`${style.subTable} `}>
        <table className={` table`}>
          <tbody>
            <tr className='border'>
              <td className='border'>Sub-total: </td>
              <td className='border'>Rs.{commaConverter(props.subTotal)}</td>
            </tr>
            <tr className='border'>
              <td className='border'>Total: </td>
              <td className='border'>Rs.{commaConverter(props.subTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
