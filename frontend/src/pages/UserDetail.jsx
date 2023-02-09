import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
axios.defaults.withCredentials = true;
const base_url = process.env.REACT_APP_BASE_URL;
const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      //console.log("id", id);
      try {
        const res = await axios.get(`${base_url}/user/${id}`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        console.log("single User Error", error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{user.username}</h1>
    </div>
  );
};

export default UserDetail;
