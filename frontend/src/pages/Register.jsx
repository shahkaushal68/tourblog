import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../redux/features/auth/authSlice";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("username is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(4, "Min 4 Characters!")
    .max(8, "Max 8 Character!")
    .required("Password is Required"),
  passwordConfirmation: Yup.string()
    .required("Please ReEnter password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message } = useSelector((state) => state.auth);
  //console.log("isError", isError, message);
  useEffect(() => {
    isError && toast.error(message);
  }, [isError, message]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(registerUser({ values, toast, navigate }));
    },
  });
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label">
                  Username<small style={{ color: "red" }}>*</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <small style={{ color: "red" }}>{formik.errors.username}</small>
              </div>
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

              <div className="form-outline mb-4">
                <label className="form-label">
                  Confirm Password<small style={{ color: "red" }}>*</small>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirmation"
                  onChange={formik.handleChange}
                />
                <small style={{ color: "red" }}>
                  {formik.errors.passwordConfirmation}
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign up
              </button>
              <div className="d-flex justify-content-around align-items-center mt-4">
                Already Register? <Link to="/login">Login here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
