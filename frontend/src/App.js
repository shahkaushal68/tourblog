import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/auth/authSlice";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AddTour from "./pages/AddTour";
import EditTour from "./pages/EditTour";
import TourDetail from "./pages/TourDetail";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import UserDetail from "./pages/UserDetail";
import SearchTourList from "./pages/SearchTourList";
import TagTourList from "./pages/TagTourList";
axios.defaults.withCredentials = true;

function App() {
  const fetchUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(fetchUser));
  }, [dispatch, fetchUser]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/tours/search" element={<SearchTourList />} />
          <Route path="/tours/tag" element={<TagTourList />} />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditTour />
              </PrivateRoute>
            }
          />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route
            path="/dashboard/:id"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
