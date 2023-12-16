import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const DepartmentChart = () => {
  const [data, setData] = useState([]);

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

        // Process the data to aggregate by department
        const aggregatedData = {};
        response.data.records.forEach((record) => {
          const { department, income, expense } = record;

          if (!aggregatedData[department]) {
            aggregatedData[department] = { department, income: 0, expense: 0 };
          }
          aggregatedData[department].income += income || 0;
          aggregatedData[department].expense += expense || 0;
        });

        setData(Object.values(aggregatedData));
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="department" type="category" width={80} />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#82ca9d" />
        <Bar dataKey="expense" fill="red" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentChart;
