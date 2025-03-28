"use client";
import { useState } from "react";
import styles from "../styles/queryInput.module.css";

export default function QueryInput({ onQueryChange, onRunQuery }) {
  const [query, setQuery] = useState("");
  const [queryMode, setQueryMode] = useState("manual"); // "manual" | "predefined"

  // List of predefined SQL queries (Updated for Correct Columns)
  const predefinedQueries = [
    "SELECT * FROM employees LIMIT 5;",
    "SELECT firstName, lastName, title FROM employees WHERE title LIKE '%Manager%';",
    "SELECT COUNT(*) FROM employees;",
    "SELECT companyName, contactName FROM customers WHERE country = 'USA';",
    "SELECT COUNT(*) FROM customers;",
    "SELECT * FROM customers ORDER BY customerID DESC LIMIT 10;",
    "SELECT regionID, COUNT(*) FROM territories GROUP BY regionID;",
    "SELECT COUNT(*) FROM territories;",

    "SELECT * FROM orders LIMIT 5;",
    "SELECT COUNT(*) FROM orders;",
    "SELECT orderID, customerID, shipCountry FROM orders WHERE shipCountry = 'Germany';",
    "SELECT orderID, customerID, orderDate FROM orders WHERE orderDate BETWEEN '2025-03-01' AND '2025-03-31';",
    "SELECT orderID, customerID, orderDate FROM orders WHERE shippedDate IS NULL;",

    // New queries for order_details
    "SELECT * FROM order_details LIMIT 5;",
    "SELECT COUNT(*) FROM order_details;",
    "SELECT productID, unitPrice, quantity, discount FROM order_details WHERE orderID = 10248;",
    "SELECT productID, SUM(unitPrice * quantity) AS totalRevenue FROM order_details GROUP BY productID;",
    "SELECT productID, SUM(discount) AS totalDiscount FROM order_details GROUP BY productID;",
  ];

  const handleChange = (e) => {
    setQuery(e.target.value);
    onQueryChange(e.target.value);
  };

  const handleRunQuery = () => {
    onRunQuery(query);
  };

  const handlePredefinedQueryClick = (selectedQuery) => {
    setQuery(() => selectedQuery); // Use functional update to ensure state changes properly
    onQueryChange(selectedQuery);

    // Delay execution of onRunQuery to ensure query state is updated
    setTimeout(() => {
      onRunQuery(selectedQuery);
    }, 0);
  };

  const handleToggle = () => {
    const newMode = queryMode === "manual" ? "predefined" : "manual";
    setQueryMode(newMode);
    if (onChange) {
      onChange(newMode);
    }
  };

  return (
    <div className={styles.queryInputContainer}>
      <div className={styles.header}>
        <div className={styles.switchWrapper}>
          <h2>SQL Query Input</h2>

          {/* Toggle Button */}
          <button
            className={`${styles.toggleSwitch} ${
              queryMode === "predefined" ? styles.active : ""
            }`}
            onClick={handleToggle}
            aria-pressed={queryMode === "predefined"}
            type="button"
          >
            <span className={styles.toggleText}>
              <span className={styles.leftText}>Manual</span>
              <span className={styles.rightText}>Predefined</span>
            </span>
            <span className={styles.toggleSlider}></span>
          </button>
        </div>
      </div>
      <div className={styles.codeEditor}>
        {/* Run Query Button (Only visible in manual mode) */}
        {queryMode === "manual" && (
          <div className={styles.buttonContainer}>
            <button className={styles.runButton} onClick={handleRunQuery}>
              Run Query
            </button>
          </div>
        )}
        {/* Manual Mode: Show textarea */}
        {queryMode === "manual" && (
          <textarea
            className={styles.textarea}
            value={query}
            onChange={handleChange}
            placeholder="Write your SQL query here..."
          />
        )}
      </div>
      {/* Predefined Mode: Show predefined queries */}
      {queryMode === "predefined" && (
        <div className={styles.predefinedQueries}>
          <h3>Select a Predefined Query:</h3>
          {predefinedQueries.map((q, index) => (
            <button
              key={index}
              className={styles.queryButton}
              onClick={() => handlePredefinedQueryClick(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
