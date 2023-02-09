import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput) {
      navigate(`/tours/search?searchQuery=${searchInput}`);
      setSearchInput("");
    } else {
      toast.error("Please enter value in search");
    }
  };

  return (
    <div className="input-group">
      <div className="form-outline">
        <input
          type="search"
          className="form-control"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <label className="form-label">Search</label>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Search;
