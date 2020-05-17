import React, { useState, useEffect } from "react";
import ProductDetails from "./ProductDetail/ProductDetails";
import Cards from "../../components/Cards/Cards";
import Title from "../../Assets/Title";
import Axios from "./../../Axios";
import Spinner from "./../../components/Spinner/spinner";
export default function Details({ match, location }) {
  const {
    params: { id },
  } = match;

  const [products, setProducts] = useState([]);
  const [related, setRelated] = useState([]);

  const [Load, setLoad] = useState(false);

  useEffect(() => {
    Axios.get(`/api/categories/${id}`)
      .then((res) => {
        const Productdata = res.data.data;
        const relatedData = res.data.relatedItems;
        setProducts(Productdata);
        setRelated(relatedData);
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  let state = <Spinner />;
  if (Load) {
    state = (
      <div>
        <ProductDetails State={Load} Data={products} id={id} />
        <Title Title='Related Items' />
        <Cards loading={!Load} data={related} />
      </div>
    );
  }
  return state;
}
