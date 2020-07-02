import React from "react";

export default function OrderTable(props) {
  const orders = props.order;
  return (
    <div className='table-responsive'>
      <table className='table border '>
        <thead className='table-active text-left'>
          <tr>
            <th scope='col-1'>No. of Products</th>
            <th scope='col-5'>Product Title</th>
            <th scope='col-3'>Date </th>
            <th scope='col-1'>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((e, i) => {
            const date = new Date(e[0].date).toLocaleDateString();
            const noOfProduct = e[1].orders.map((b) => {
              return b.Title;
            });

            return (
              <tr key={i}>
                <td className=' border '>{noOfProduct.length}</td>
                <td className=' border '>
                  {noOfProduct.map((e, i) => {
                    return (
                      <span key={i} style={{ display: "block" }}>
                        {e}
                      </span>
                    );
                  })}
                </td>
                <td className=' border '>{date}</td>
                <td className=' border '>pending...</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
