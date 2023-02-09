import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TourCard from "../components/TourCard";

const SearchTourList = () => {
  const [searchTourData, setSearchTourData] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("searchQuery");

  useEffect(() => {
    const fetchSearch = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/tour/search?searchQuery=${query}`
      );
      //console.log(res.data);
      return setSearchTourData(res.data);
    };
    fetchSearch();
  }, [query]);
  //console.log(query);
  return (
    <>
      {searchTourData.length > 0 ? (
        <div className="container-fluid">
          <div className="row mt-5 mb-5">
            <h4 style={{ textAlign: "center" }}>Search Tours</h4>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {searchTourData?.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      ) : (
        <div className="title">
          <h4 style={{ textAlign: "center", margin: "15px 0" }}>
            No Search Found! Please Search with other title.
          </h4>
        </div>
      )}
    </>
  );
};

export default SearchTourList;
