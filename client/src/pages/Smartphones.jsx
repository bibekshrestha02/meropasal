import React, { useState, useEffect } from "react";
import Carousel from "./../components/Carousel/carousel";
import Title from "./../Assets/Title";
import Cards from "./../components/Cards/Cards";
import Axios from "./../Axios";
import Spinner from "./../components/Spinner/spinner";
export default function Smartphones() {
  const [Mobile, setMobile] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/api/mobiles")
      .then((e) => {
        setMobile(e.data.data);
        setLoading(false);
        // console.log(loading);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let loader = <Spinner />;
  if (!loading) {
    loader = (
      <div>
        <Carousel />
        <Title Title='Smart Phones' />
        <Cards loading={loading} data={Mobile} />
      </div>
    );
  }
  return loader;
}
