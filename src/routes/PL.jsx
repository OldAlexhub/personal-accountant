import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/PL.css";

const PL = () => {
  const [statement, setStatement] = useState({
    incomeRecords: [],
    expenseRecords: [],
    totalIncome: 0,
    totalExpenses: 0,
  });

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

        const fetchedRecords = response.data.records;
        const incomeRecords = fetchedRecords.filter(
          (record) => record.type === "income"
        );
        const expenseRecords = fetchedRecords.filter(
          (record) => record.type === "expense"
        );

        const totalIncome = incomeRecords.reduce(
          (acc, curr) => acc + curr.income,
          0
        );
        const totalExpenses = expenseRecords.reduce(
          (acc, curr) => acc + curr.expense,
          0
        );

        setStatement({
          incomeRecords,
          expenseRecords,
          totalIncome,
          totalExpenses,
        });
      } catch (error) {
        console.error("Error fetching records:", error);
        // Optionally handle the error more explicitly here, e.g., setting an error state
      }
    };
    fetchRecords();
  }, []);

  const formatCurrency = (amount) => {
    // Using the US locale, dollars as the currency, and displaying as decimal currency
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    // Extract headers
    let headerLine = "";
    if (array.length > 0) {
      headerLine = Object.keys(array[0]).join(",");
      str += headerLine + "\r\n";
    }

    // Extract data
    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line !== "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }

    return str;
  };
  // Handle download
  const downloadCSV = () => {
    const incomeCSV = convertToCSV(statement.incomeRecords);
    const expenseCSV = convertToCSV(statement.expenseRecords);
    const combinedCSV =
      "Income Records\r\n" + incomeCSV + "\r\nExpense Records\r\n" + expenseCSV;

    const blob = new Blob([combinedCSV], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Profit_Loss_Report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h3>Profit & Loss Statement</h3>
      </div>
      <div className="text-center my-4">
        <button onClick={downloadCSV} className="btn btn-primary">
          Download as CSV
        </button>
      </div>
      <table className="table">
        {/* ... Income table header ... */}
        <tbody>
          {statement.incomeRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.incomee}</td>
              <td className="text-right">{formatCurrency(record.income)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table-primary">
            <th>Total Income</th>
            <th className="text-right">
              {formatCurrency(statement.totalIncome)}
            </th>
          </tr>
        </tfoot>
      </table>

      <table className="table">
        {/* ... Expenses table header ... */}
        <tbody>
          {statement.expenseRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.department}</td>
              <td className="text-right">{formatCurrency(record.expense)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table-secondary">
            <th>Total Expenses</th>
            <th className="text-right">
              {formatCurrency(statement.totalExpenses)}
            </th>
          </tr>
        </tfoot>
      </table>

      <div className="text-center my-4">
        <div className="row">
          <div className="col">
            <h4 className="d-inline">Profit/Loss: </h4>
            <span className="h4">
              {formatCurrency(statement.totalIncome - statement.totalExpenses)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PL;
