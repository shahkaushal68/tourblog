import React from "react";
import { Link } from "react-router-dom";

const RelatedTour = ({ relatedTour }) => {
  //console.log("relatedtour", relatedTour);
  return (
    <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
      <div className="card">
        <div className="d-flex justify-content-between p-3">
          <p className="lead mb-0">{relatedTour.title}</p>
        </div>
        <img
          src={relatedTour.image.url}
          className="card-img-top"
          alt={relatedTour.title}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="small">
              <Link to="#" className="text-muted">
                Laptops
              </Link>
            </p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-0">HP Notebook</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedTour;
