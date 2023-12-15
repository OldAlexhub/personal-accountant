import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We are a virtual Personal Accountant Software</p>
          </div>
          <div className="col-md-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="/add" className="text-white">
                  Add
                </a>
              </li>
              <li>
                <a href="/pl" className="text-white">
                  P&L
                </a>
              </li>
              <li>
                <a href="/reports" className="text-white">
                  Reports
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>info@oldalexhub.com</p>
          </div>
        </div>

        <div className="text-center mt-3">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
