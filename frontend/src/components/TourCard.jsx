import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { likeTour } from "../redux/features/tourSlice";

const TourCard = ({ tour }) => {
  //console.log("tour", tour);
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.auth?.user);
  //console.log("state", user);
  const subString = (str) => {
    if (str?.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };

  const handleLike = (id) => {
    //console.log("tourid", id);
    dispatch(likeTour(id));
  };

  const Likes = () => {
    if (tour.likes.length > 0) {
      return tour.likes.find((item) => item === state?.user?._id) ? (
        <>
          <div className="thub-icon">
            <BsHandThumbsUpFill
              style={{ color: "blue" }}
              onClick={() => handleLike(tour._id)}
            />
          </div>
          {tour.likes.lenght > 2 ? (
            <div className="likeCount">
              You and {tour.likes.length - 1} other Likes
            </div>
          ) : (
            <div className="likeCount">{tour.likes.length} Likes</div>
          )}
        </>
      ) : (
        <>
          <div className="thub-icon">
            <BsHandThumbsUpFill onClick={() => handleLike(tour._id)} />
          </div>
          <div className="likeCount">{tour.likes.length} Likes</div>
        </>
      );
    }
    return (
      <>
        <div className="thub-icon">
          <BsHandThumbsUpFill onClick={() => handleLike(tour._id)} />
        </div>
        <div className="likeCount">{tour.likes.length} Likes</div>
      </>
    );
  };

  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-image-section">
          <img
            src={tour?.image?.url}
            className="card-img-top"
            alt="Skyscrapers"
          />
          <div className="author-section">
            <b>{tour?.name}</b>
          </div>
        </div>
        <div className="card-body-upper">
          <div className="tags-section">
            <ul className="tags-listing">
              {tour?.tags?.map((tag, index) => (
                <Link to={`/tours/tag?tagQuery=${tag}`} key={index}>
                  <li className="tags-item">#{tag}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="icon-section">
            <Likes />
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{tour?.title}</h5>
          <p className="card-text">
            {subString(tour?.description)}
            <br />
            <Link to={`/tour/${tour._id}`}>Read More</Link>
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            Last updated{" "}
            {moment.utc(tour?.updatedAt).local().startOf("seconds").fromNow()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
