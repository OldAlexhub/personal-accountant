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

const IncomeChart = () => {
  const [incomeData, setIncomeData] = useState([]);

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

        // Process the data to aggregate income by month
        const aggregatedIncome = response.data.records.reduce((acc, record) => {
          const { income, transaction_Date } = record;
          const month = new Date(transaction_Date).toLocaleString("default", {
            month: "long",
          });

          acc[month] = acc[month] || { month, income: 0 };
          acc[month].income += income || 0;

          return acc;
        }, {});

        setIncomeData(Object.values(aggregatedIncome));
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <BarChart width={600} height={300} data={incomeData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" fill="green" />
    </BarChart>
  );
};

export default IncomeChart;
