import React, { useState } from "react";
import Logo from "../images/logo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false, message: "", type: "" }); // Reset alert state

    try {
      await axios.post(process.env.REACT_APP_SIGNUP, formData);
      // console.log(`Login Successful`);
      setAlert({
        show: true,
        message: "Signup Successful. Redirecting to login...",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      // console.log(error);
      setAlert({
        show: true,
        message: "Signup Failed. Please try again.",
        type: "danger",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="logo"
              className="img-fluid"
              style={{ maxWidth: "450px" }}
            />
          </div>
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  className="form-control"
                  id="fname"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  className="form-control"
                  id="lname"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
            {alert.show && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
