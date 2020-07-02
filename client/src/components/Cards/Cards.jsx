import React, { useEffect } from "react";
import Card from "./Card/Card";
// import style from "./cards.module.scss";
export default function Cards(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  let CardData = (
    <div className={`row container-fluid mt-3 mb-4`} style={{ margin: "auto" }}>
      {props.data.map((e, i) => {
        return (
          <div className='col' key={i}>
            <Card
              loading={props.data}
              Image={e.Photo}
              Link={`/Product/?id=${e._id}`}
              Rating={e.Rating}
              Price={e.Price}
              Title={e.Title}
            />
          </div>
        );
      })}
    </div>
  );

  if (props.loading) {
    CardData = "Loading";
  }

  return <div className='row'>{CardData}</div>;
}
