import React from "react";
export default function CartsTable(props) {
  return (
    <table className='table mt-1'>
      <thead>
        <tr>
          <th>Itmes</th>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.CartItems.map((e, i) => {
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
              <td>{e.Order}</td>
              <td>
                <span>{e.Total}</span>
              </td>
              <td>
                <span
                  className='clseBtn'
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
  );
}
