import React, { useEffect, useState } from "react";
import Carousel from "./../components/Carousel/carousel";
import Title from "./../Assets/Title";
import Cards from "./../components/Cards/Cards";
import Axios from "./../Axios";
import Spinner from "./../components/Spinner/spinner";
export default function Laptop() {
  const [Laptop, setLaptop] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/api/laptops").then((e) => {
      setLaptop(e.data.data);
      setLoading(false);
    });
  }, []);
  let loader = <Spinner />;
  if (!loading) {
    loader = (
      <div>
        <Carousel />
        <Title Title='Laptops' />
        <Cards loading={loading} data={Laptop} />
      </div>
    );
  }
  return loader;
}
