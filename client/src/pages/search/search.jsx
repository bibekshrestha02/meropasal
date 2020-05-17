import React, { useState, useEffect } from "react";
import Axios from "./../../Axios";
import TitleB from "./../../Assets/Title";
import Card from "./../../components/Cards/Card/Card";
import "./search.css";
export default function Search({ match, location }) {
  const {
    params: { Title },
  } = match;
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    Axios.get(`/api/search/${Title}`)
      .then((res) => {
        if (res.data.SearchItems.length === 0) {
          setMessage("No Items Found");
          setLoading(false);
        } else {
          setSearchResult(res.data.SearchItems);
          setLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Title]);
  let CardResult = message;
  if (loading) {
    searchResult.map((e) => {
      return (CardResult = (
        <Card
          loading={loading}
          Image={e.Photo}
          Link={"/" + e.Categories + "/" + e._id}
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
      {/* <h1>hellow From search</h1> */}
    </div>
  );
}
