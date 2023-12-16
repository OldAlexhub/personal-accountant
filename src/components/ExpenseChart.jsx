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

const ExpenseChart = () => {
  const [expenseData, setExpenseData] = useState([]);

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

        // Process the data to aggregate expense by month
        const aggregatedExpense = response.data.records.reduce(
          (acc, record) => {
            const { expense, transaction_Date } = record;
            const month = new Date(transaction_Date).toLocaleString("default", {
              month: "long",
            });

            acc[month] = acc[month] || { month, expense: 0 };
            acc[month].expense += expense || 0;

            return acc;
          },
          {}
        );

        setExpenseData(Object.values(aggregatedExpense));
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <BarChart width={600} height={300} data={expenseData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="expense" fill="red" />
    </BarChart>
  );
};

export default ExpenseChart;
