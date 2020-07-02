import React, { useState, useEffect } from "react";
import ProductDetails from "./ProductDetail/ProductDetails";
import Cards from "../../components/Cards/Cards";
import Title from "../../Assets/Title";
import Axios from "./../../Axios";
import Spinner from "./../../components/Spinner/spinner";
import QueryString from "query-string";
import LinkDir from "../../components/LinksDir/LinkDir";
export default function Details({ location }) {
  const { id } = QueryString.parse(location.search);
  const [products, setProducts] = useState([]);
  const [related, setRelated] = useState([]);
  const [Load, setLoad] = useState(false);
  useEffect(() => {
    Axios.get(`/api/Products/${id}`).then((res) => {
      const Productdata = res.data.data;
      const relatedData = res.data.relatedItems;

      setProducts(Productdata);
      setRelated(relatedData);
      setLoad(true);
    });
  }, [id]);

  let state = <Spinner />;
  if (Load) {
    state = (
      <>
        <LinkDir
          firstLink={products.Categories}
          firstLinkTo={`/${products.Categories}`}
          secondLinkTo={`/Product/?id=${products._id}`}
          secondLink={products.Title}
        />
        <ProductDetails State={Load} Data={products} id={id} />
        <Title Title='Related Items' />
        <Cards loading={!Load} data={related} />
      </>
    );
  }
  return state;
}
