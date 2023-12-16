import React, { useState } from "react";
import Logo from "../images/logo.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, formData);
      const userId = response.data.userId;
      const token = response.data.token;
      const name = response.data.name;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      setAlert({
        show: true,
        message: "Login Successful. Redirecting to Add Records...",
        type: "success",
      });
      setTimeout(() => navigate("/add"), 3000);
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Login Failed. Please try again.",
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
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            {alert.show && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}
          </div>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Click here</Link> to
            register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
