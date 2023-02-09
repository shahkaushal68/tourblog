import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FetchSingleTour, updateTour } from "../redux/features/tourSlice";
import { toast } from "react-toastify";

const EditTour = () => {
  const [tourData, setTourData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => state?.tour);
  const navigate = useNavigate();
  //console.log("state", tour);
  const handleChange = (e) => {
    setTourData({
      ...tourData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImage = (e) => {
    //console.log("files", e.target.files);
    setTourData({
      ...tourData,
      image: e.target.files[0],
    });
  };
  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const removeTags = (indexRemove) => {
    setTags(tags.filter((_, index) => index !== indexRemove));
  };

  const formData = new FormData();
  formData.append("title", tourData.title);
  formData.append("description", tourData.description);
  formData.append("image", tourData.image || tour.image);
  for (var i = 0; i < tags?.length; i++) {
    formData.append("tags", tags[i]);
  }

  const handleAddTour = (e) => {
    e.preventDefault();
    dispatch(updateTour({ id, formData, toast, navigate }));
  };

  const handleClear = () => {
    setTourData({
      title: "",
      description: "",
      image: "",
    });
    setTags([]);
  };

  //const { isError, message } = useSelector((state) => state.tour);
  //console.log("isError", isError, message);
  useEffect(() => {
    if (id) {
      dispatch(FetchSingleTour(id));
      setTourData(tour);
      setTags(tour.tags);
    }
  }, [dispatch, id]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-section">
            <h4 style={{ textAlign: "center" }}>Edit Tour</h4>
            <div className="addEditForm">
              <form className="row g-3 needs-validation">
                <div className="form-outline mb-4">
                  <label className="form-label">
                    Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={tourData.title}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Please enter title.</div>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    cols="50"
                    onChange={handleChange}
                    value={tourData.description}
                  ></textarea>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Add Tags</label>
                  <div className="tags-input">
                    <ul id="tags">
                      {tags?.map((tag, index) => (
                        <li key={index} className="tag">
                          <span className="tag-title">{tag}</span>
                          <span
                            className="tag-close-icon"
                            onClick={() => removeTags(index)}
                          >
                            x
                          </span>
                        </li>
                      ))}
                    </ul>
                    <input
                      type="text"
                      onKeyUp={(event) =>
                        event.key === "Enter" ? addTags(event) : null
                      }
                      placeholder="Press enter to add tags..."
                    />
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Add Tour Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    id="customFile"
                    onChange={handleImage}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTour}
                  className="btn btn-primary btn-block"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-danger btn-block"
                >
                  Clear
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTour;
