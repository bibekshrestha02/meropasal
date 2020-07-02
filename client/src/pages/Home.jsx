import React, { useState, useEffect } from "react";
import Carousel from "./../components/Carousel/carousel";
import Title from "./../Assets/Title";
import Cards from "./../components/Cards/Cards";
import Axios from "./../Axios";
import Spinner from "./../components/Spinner/spinner";
export default function Home() {
  const [bestSell, setBestSell] = useState([]);
  const [latestProduct, setlatesProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/api/").then((e) => {
      const bestSells = e.data.bestSells;
      const latestProduct = e.data.latestProdut;
      setBestSell(bestSells);
      setlatesProduct(latestProduct);
      setLoading(false);
    });
  }, []);
  let Loader = <Spinner />;
  if (!loading) {
    Loader = (
      <div>
        <Carousel />
        <Title Title='Latest Products' />
        <Cards loading={loading} data={latestProduct} />
        <Title Title='Best Sellers' />
        <Cards loading={loading} data={bestSell} />
      </div>
    );
  }

  return Loader;
}
