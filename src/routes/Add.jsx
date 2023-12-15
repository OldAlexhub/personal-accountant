import React, { useState } from "react";
import Logo from "../images/logo.jpg";
import axios from "axios";

const Add = () => {
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    userId: userId,
    department: "",
    vendor: "",
    expense: "",
    income: "",
    incomee: "",
    type: "",
    transaction_Date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(process.env.REACT_APP_ADD_RECORDS, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlert({
        show: true,
        message: "Record Added Successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Record Failed to Add. Please try again.",
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
              style={{ maxWidth: "350px" }}
            />
          </div>
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="transactionDate" className="form-label">
                  Transaction Date
                </label>
                <input
                  type="date"
                  name="transaction_Date"
                  className="form-control"
                  id="transaction_Date"
                  value={formData.transaction_Date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <select
                  className="form-select"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option>Select One</option>
                  <option value="housing">Housing</option>
                  <option value="utilities">Utilities</option>
                  <option value="food"> Food and Groceries</option>
                  <option value="transportation">Transportation</option>
                  <option value="hhealthcare">Healthcare</option>
                  <option value="insurance">Insurance</option>
                  <option value="personal">Personal and Family Care</option>
                  <option value="education">Education</option>
                  <option value="debt">Debt Payments</option>
                  <option value="savings">Savings and Investments</option>
                  <option value="entertainment">
                    Entertainment and Recreation
                  </option>
                  <option value="clothing">Clothing and Apparel</option>
                  <option value="charitable">Charitable Donations</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="vendor" className="form-label">
                  Vendor
                </label>
                <input
                  type="text"
                  name="vendor"
                  className="form-control"
                  id="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expense" className="form-label">
                  Expense
                </label>
                <input
                  type="number"
                  name="expense"
                  className="form-control"
                  id="expense"
                  value={formData.expense}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="income" className="form-label">
                  Income
                </label>
                <input
                  type="number"
                  name="income"
                  className="form-control"
                  id="income"
                  value={formData.income}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="incomeSource" className="form-label">
                  Income Source
                </label>
                <input
                  type="text"
                  name="incomee"
                  className="form-control"
                  id="incomee"
                  value={formData.incomee}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Select One</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Add Record
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

export default Add;
