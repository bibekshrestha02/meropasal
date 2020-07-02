import React, { useState, useEffect } from "react";
import Axios from "./../../Axios";
import TitleB from "./../../Assets/Title";
import Card from "./../../components/Cards/Card/Card";
import "./search.css";
import QueryString from "query-string";
export default function Search({ location }) {
  const { product } = QueryString.parse(location.search);

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    Axios.get(`/api/search/${product}`).then((res) => {
      if (res.data.SearchItems.length === 0) {
        setMessage("No Items Found");
        setLoading(false);
      } else {
        setSearchResult(res.data.SearchItems);
        setLoading(true);
      }
    });
  }, [product]);
  let CardResult = message;
  if (loading) {
    searchResult.map((e) => {
      return (CardResult = (
        <Card
          loading={loading}
          Image={e.Photo}
          Link={"/Product/" + e._id}
          Rating={e.Rating}
          Price={e.Price}
          Title={e.Title}
        />
      ));
    });
  }
  return (
    <div className='search'>
      <TitleB Title='Search Items' />
      <div className='CenterCards mt-2'>{CardResult}</div>
    </div>
  );
}
