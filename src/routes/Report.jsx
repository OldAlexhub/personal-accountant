import React, { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
  const [statement, setStatement] = useState([]);
  const [searchDate, setSearchDate] = useState(""); // State for search query

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
        setStatement(response.data.records);
      } catch (error) {
        console.error("Error fetching records:", error);
        // Optionally handle the error more explicitly here, e.g., setting an error state
      }
    };
    fetchRecords();
  }, []);

  const deleteRecord = async (_id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_DELETE_RECORD}/delete/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the state to remove the deleted record
      setStatement(statement.filter((state) => state._id !== _id));
    } catch (error) {
      console.error("Error deleting record:", error);
      // Optionally handle the error more explicitly here
    }
  };
  const totalExpense = statement.reduce(
    (acc, curr) => acc + Number(curr.expense),
    0
  );
  const totalIncome = statement.reduce(
    (acc, curr) => acc + Number(curr.income),
    0
  );
  const handleSearchChange = (e) => {
    setSearchDate(e.target.value);
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Filtered list based on search query
  const filteredStatements = statement.filter((state) => {
    const formattedTransactionDate = formatDate(state.transaction_Date);

    if (searchDate.length === 10) {
      // User is searching for an exact date
      return formattedTransactionDate === searchDate;
    } else if (searchDate.length === 7) {
      // User is searching for a month and year (MM/YYYY)
      const [month, year] = searchDate.split("/");
      const [transMonth, transDay, transYear] =
        formattedTransactionDate.split("/");
      return month === transMonth && year === transYear;
    }
    return true;
  });

  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str =
      `${Object.keys(array[0])
        .map((value) => `"${value}"`)
        .join(",")}` + "\r\n";

    return array.reduce((str, next) => {
      str +=
        `${Object.values(next)
          .map((value) => `"${value}"`)
          .join(",")}` + "\r\n";
      return str;
    }, str);
  };
  const downloadCSV = () => {
    const csvStr = convertToCSV(statement);
    const blob = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="container mt-5">
      <div>
        <h1 className="text-center mb-4">Transaction Center</h1>
        <button
          className="btn btn-primary"
          onClick={downloadCSV}
          style={{ backgroundColor: "red" }}
        >
          Download as CSV
        </button>
        <div className="mb-3 d-flex">
          <div className="me-2">
            <label htmlFor="searchDate" className="form-label">
              Search by Transaction Date:
            </label>
            <input
              type="text" // Changed to text to allow for MM/DD/YYYY input
              className="form-control"
              id="searchDate"
              value={searchDate}
              onChange={handleSearchChange}
              placeholder="MM/DD/YYYY or MM/YYYY"
            />
          </div>
          <button
            className="btn btn-secondary align-self-end"
            onClick={() => setSearchDate("")}
          >
            Clear
          </button>
        </div>
        <div className="totals my-4">
          <p className="fs-5 fw-bold">
            Total Expense:{" "}
            <span className="text-danger">
              $
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              })
                .format(totalExpense)
                .slice(1)}
            </span>
          </p>
          <p className="fs-5 fw-bold">
            Total Income:{" "}
            <span className="text-success">
              $
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              })
                .format(totalIncome)
                .slice(1)}
            </span>
          </p>
        </div>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Transaction Id</th>
            <th>Transaction Date</th>
            <th>Vendor</th>
            <th>Department</th>
            <th>Type</th>
            <th>Expense</th>
            <th>Income Source</th>
            <th>Income</th>
            <th>Remove Transaction</th>
          </tr>
        </thead>
        <tbody>
          {searchDate
            ? filteredStatements.map((state) => (
                <tr key={state._id}>
                  <td>{state.transaction_Id}</td>
                  <td>
                    {new Date(state.transaction_Date).toLocaleDateString()}
                  </td>
                  <td>{state.vendor}</td>
                  <td>{state.department}</td>
                  <td>{state.type}</td>
                  <td>
                    $
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                      .format(state.expense)
                      .slice(1)}
                  </td>
                  <td>{state.incomee}</td>
                  <td>
                    $
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                      .format(state.income)
                      .slice(1)}
                  </td>
                  <td>
                    <button onClick={() => deleteRecord(state._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            : statement.map((state) => (
                <tr key={state._id}>
                  <td>{state.transaction_Id}</td>
                  <td>
                    {new Date(state.transaction_Date).toLocaleDateString()}
                  </td>
                  <td>{state.vendor}</td>
                  <td>{state.department}</td>
                  <td>{state.type}</td>
                  <td>
                    $
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                      .format(state.expense)
                      .slice(1)}
                  </td>
                  <td>{state.incomee}</td>
                  <td>
                    $
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                      .format(state.income)
                      .slice(1)}
                  </td>
                  <td>
                    <button onClick={() => deleteRecord(state._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
