import React from "react";
import style from "./footer Css/style.module.scss";
export default function Footer() {
  return (
    <div className={`${style.footer} mt-3`}>
      <div className='row w-100 mx-auto'>
        <div className='col-lg-3 border  p-3'>
          <div className={style.serviceWidget}>
            <i>
              <img src='https://www.sastodeal.com/media/Bitmap1.png' alt='' />
            </i>
            <h4>Secured Payment</h4>
            <p></p>
          </div>
        </div>
        <div className='col-lg-3 border  p-3'>
          <div className={style.serviceWidget}>
            <i>
              <img src='https://www.sastodeal.com/media/Bitmap2.png' alt='' />
            </i>
            <h4>Verified Sellers</h4>
            <p></p>
          </div>
        </div>
        <div className='col-lg-3 border  p-3'>
          <div className={style.serviceWidget}>
            <i>
              <img src='https://www.sastodeal.com/media/Bitmap3.png' alt='' />
            </i>
            <h4>OnTime Delivery</h4>
            <p></p>
          </div>
        </div>
        <div className='col-lg-3 border p-3'>
          <div className={style.serviceWidget}>
            <i>
              <img src='https://www.sastodeal.com/media/Bitmap4.png' alt='' />
            </i>
            <h4>Excellent Customer Service</h4>
            <p></p>
          </div>
        </div>
      </div>
      <div className={`${style.footerDown} text-center`}>
        <b style={{ fontSize: "20px" }}>
          <font color='red'>Mero</font>
          <font>Pasal</font>
        </b>
        <span style={{ fontWeight: "500" }}> Online Shopping Nepal</span>
        <p>Copyright © 2020 MeroPasal. All Rights Reserved.</p>
      </div>
    </div>
  );
}
