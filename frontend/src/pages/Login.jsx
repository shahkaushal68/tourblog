import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(4, "Min 4 Characters!")
    .max(8, "Max 8 Character!")
    .required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message } = useSelector((state) => state.auth);
  //console.log("isError", isError, message);
  useEffect(() => {
    isError && toast.error(message);
  }, [isError, message]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(loginUser({ values, toast, navigate }));
    },
  });

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Email address<small style={{ color: "red" }}>*</small>
                </label>
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <small style={{ color: "red" }}>{formik.errors.email}</small>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password<small style={{ color: "red" }}>*</small>
                </label>
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <small style={{ color: "red" }}>{formik.errors.password}</small>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
              <div className="d-flex justify-content-around align-items-center mt-4">
                <Link to="">Forgot password?</Link>
                Don't have an account? <Link to="/register">Register here</Link>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
