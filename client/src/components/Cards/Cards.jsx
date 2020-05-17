import React, { useEffect } from "react";
import Card from "./Card/Card";
import "./Cards.css";
export default function Cards(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  let CardData = props.data.map((e) => {
    return (
      <div className='cards' key={e._id}>
        <div className='col'>
          <Card
            loading={props.data}
            Image={e.Photo}
            Link={`/Product/${e._id}`}
            Rating={e.Rating}
            Price={e.Price}
            Title={e.Title}
          />
        </div>
      </div>
    );
  });

  if (props.loading) {
    CardData = "Loading";
  }

  // console.log(props.data);
  return <div className='row'>{CardData}</div>;
}
