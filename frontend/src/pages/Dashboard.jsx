import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTour, FetchUserTours } from "../redux/features/tourSlice";

const Dashboard = () => {
  const { id } = useParams();
  //console.log("id", id);
  const dispatch = useDispatch();
  const { auth, tour } = useSelector((state) => state);

  //console.log("state", state);
  const excpert = (desc) => {
    if (desc.length > 45) {
      desc = desc.substring(0, 45) + "...";
    }
    return desc;
  };

  useEffect(() => {
    dispatch(FetchUserTours(id));
  }, [dispatch, id]);

  const handleRemove = (tourId) => {
    dispatch(deleteTour(tourId));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {tour?.userTours?.length > 0 ? (
          <div className="shopping-cart">
            <h1>{auth?.user?.user?.username}</h1>
            {tour?.userTours?.map((userTour) => (
              <div className="product" key={userTour._id}>
                <div className="product-image">
                  <img src={userTour?.image?.url} alt="cc" />
                </div>
                <div className="product-details">
                  <div className="product-title">{userTour.title}</div>
                  <p className="product-description">
                    {excpert(userTour.description)}
                  </p>
                </div>
                <div className="product-removal">
                  <Link
                    to={`/edit/${userTour._id}`}
                    className="edit-product button bth"
                  >
                    Edit
                  </Link>
                </div>
                <div className="product-removal">
                  <button
                    className="remove-product"
                    onClick={() => handleRemove(userTour._id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="clear"></div>
              </div>
            ))}
          </div>
        ) : (
          <h2 style={{ textAlign: "center" }}>
            Not Any Tour added by you! Please add tour first.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
