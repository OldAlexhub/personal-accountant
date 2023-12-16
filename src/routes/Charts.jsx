import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import ExpenseChart from "../components/ExpenseChart";
import IncomeChart from "../components/IncomeChart";
import "../style/Charts.css";
import DepartmentChart from "../components/DepartmentChart";

const Charts = () => {
  const [statement, setStatement] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_GET_RECORDS}?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Process the data to aggregate income and expense by month
        const aggregatedData = response.data.records.reduce((acc, record) => {
          const { income, expense, transaction_Date } = record;
          const month = new Date(transaction_Date).toLocaleString("default", {
            month: "long",
          });

          acc[month] = acc[month] || { month, income: 0, expense: 0 };
          acc[month].income += income || 0;
          acc[month].expense += expense || 0;

          return acc;
        }, {});

        setStatement(Object.values(aggregatedData));
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <>
      <h1>Income vs. Expenses</h1>
      <BarChart width={1200} height={300} data={statement}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#82ca9d" />
        <Bar dataKey="expense" fill="red" />
      </BarChart>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Expenses by Month</h1>
            <ExpenseChart />
          </div>
          <div className="col-md-6">
            <h1>Income by Month</h1>
            <IncomeChart />
          </div>
        </div>
      </div>
      <div>
        <DepartmentChart />
      </div>
    </>
  );
};

export default Charts;
