import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const welcomeTextColor = useState("#f0efea");

  return (
    <div>
      {/* Enhanced Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://paygration.com/wp-content/uploads/2023/02/bookkeeping-gcaf7c5d71_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "150px 0", // Increased padding for height
          width: "100%", // Ensures full width
        }}
      >
        <div className="container text-white text-center">
          <h1 className="display-3" style={{ color: welcomeTextColor }}>
            Welcome to Your Personal Accountant
          </h1>
          <p className="lead">
            Manage your finances effectively and efficiently.
          </p>
          <Link
            className="btn btn-lg"
            to="/login"
            role="button"
            style={{ backgroundColor: "#b0dce5" }} // Inline style for button color
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Information Section */}
      <div className="container my-4">
        <h2>What We Do!?</h2>
        <p>
          With our personal accountant server, you will be able to add in your
          expenses and income.
        </p>
        <p>
          At the end of the year, you will be able to print out a P&L for better
          bookkeeping.
        </p>
        <p>
          If you don't have an account yet, please
          <Link to="/signup"> signup here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Home;
