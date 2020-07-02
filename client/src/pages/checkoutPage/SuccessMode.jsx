import React from "react";
import style from "./style.module.scss";
export default function SuccessMode() {
  return (
    <div className={`${style.cards} `}>
      <div className={` container`}>
        <div className='row'>
          <div
            className='alert-box'
            style={{
              float: "none",
              margin: " 0 auto",
              maxHeight: "300px",
              maxWidth: "300px",
            }}>
            <div className='alert alert-success'>
              <div className='alert-icon text-center'>
                <i className='fa fa-check-square-o  fa-3x'></i>
              </div>
              <div className='alert-message text-center'>
                <strong>Success!</strong> We received your purchase request;
                we'll be in touch shortly!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
