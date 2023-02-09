import React, { useEffect } from "react";
import TourCard from "../components/TourCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTours } from "../redux/features/tourSlice";
import { useLocation } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tour);
  const term = useLocation().search;
  const page = new URLSearchParams(term).get("page");
  //console.log(state);
  useEffect(() => {
    dispatch(fetchAllTours(page || 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {state.tours?.length > 0 ? (
        <div className="container-fluid">
          <div className="row mt-5 mb-5">
            <h4 style={{ textAlign: "center" }}>All Tours</h4>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {state?.tours?.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      ) : (
        <div className="title">
          <h4 style={{ textAlign: "center", margin: "15px 0" }}>
            No Tours Found! Please add Tour first.
          </h4>
        </div>
      )}
    </>
  );
};

export default Home;
