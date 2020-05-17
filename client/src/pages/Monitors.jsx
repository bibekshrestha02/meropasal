import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel/carousel";
import Title from "./../Assets/Title";
import Cards from "./../components/Cards/Cards";
import Axios from "./../Axios";
import Spinner from "./../components/Spinner/spinner";
export default function Camera() {
  const [Monitor, setMonitor] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/api/monitors")
      .then((e) => {
        setMonitor(e.data.data);
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
        <Title Title='Monitors' />
        <Cards loading={loading} data={Monitor} />
      </div>
    );
  }
  return loader;
}
