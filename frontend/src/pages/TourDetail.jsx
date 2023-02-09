import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchSingleTour } from "../redux/features/tourSlice";
import moment from "moment";
import RelatedTour from "../components/RelatedTour";
import axios from "axios";

const TourDetail = () => {
  const [relatedTours, setRelatedTours] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tour);
  const { id } = useParams();
  useEffect(() => {
    dispatch(FetchSingleTour(id));
  }, [dispatch, id]);
  const { title, description, image, tags, createdAt } = state?.tour;
  console.log("tags", tags);

  const fetchRelated = async () => {
    const res = await axios.post(
      `http://localhost:4000/api/tour/relatedTours?_limit=3`,
      tags
    );
    setRelatedTours(res.data);
  };
  useEffect(() => {
    fetchRelated();
  }, [tags]);

  //console.log("relatedTour", relatedTours);
  //const filterTour = relatedTours.filter((item) => item._id !== id);
  //console.log("filterTour", filterTour);
  return (
    <>
      <div className="container my-5">
        <div
          style={{ maxWidth: "700px", top: "-80px" }}
          className="mx-auto text-secondary"
        >
          <div>
            <small>
              <Link to="#" className="text-primary">
                Election
              </Link>

              <Link to="#" className="text-primary">
                Politics
              </Link>
            </small>
          </div>
          <h1 className="font-weight-bold text-dark">{title}</h1>
          <p className="my-2" style={{ lineHeight: "2" }}>
            {description}
          </p>

          <div className="my-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <small className="ml-2">
                <Link to="#" className="text-primary d-block">
                  Ahmad Sultani
                </Link>
                <span>{moment(createdAt).format("MMM Do YY")}</span>
              </small>
            </div>
          </div>
        </div>
        <img className="w-100 my-3" alt="bb" src={image?.url} />

        <div
          style={{ maxWidth: "700px", top: "-80px" }}
          className="mx-auto text-secondary"
        >
          <div className="my-3">
            {tags?.map((tag, index) => (
              <small key={index}>
                <Link to="/" className="text-primary">
                  #{tag}
                </Link>
              </small>
            ))}
          </div>
        </div>
        <div className="related-tours">
          <section style={{ backgroundColor: "#eee" }}>
            <div className="container py-5">
              <div className="row">
                {relatedTours && relatedTours.length > 0 && (
                  <>
                    <h4>Related Tours</h4>
                    {relatedTours
                      .filter((item) => item._id !== id)
                      .slice(0, 3)
                      .map((relatedTour) => (
                        <RelatedTour
                          relatedTour={relatedTour}
                          key={relatedTour._id}
                        />
                      ))}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TourDetail;
