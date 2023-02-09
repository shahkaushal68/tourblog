import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Pagination = () => {
  const { tours } = useSelector((state) => state.tour);
  console.log(tours);

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-circle">
        <li className="page-item">
          <Link className="page-link">Previous</Link>
        </li>
        {pagesNum()}
        <li className="page-item">
          <Link className="page-link" to="#">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
