"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import DataTable from "./DataTable";
import styles from "../styles/dataTable.module.css";
import Image from "next/image";
import Link from "next/link";

// Predefined Queries with Corresponding Dataset and Processing Logic
const predefinedQueries = {
  // Fetch first 5 orders
  "SELECT * FROM orders LIMIT 5;": {
    dataset: "orders",
    process: (data) => data.slice(0, 5),
  },

  // Count total orders
  "SELECT COUNT(*) FROM orders;": {
    dataset: "orders",
    process: (data) => [{ count: data.length }],
  },

  // Get all orders shipped to 'Germany'
  "SELECT orderID, customerID, shipCountry FROM orders WHERE shipCountry = 'Germany';":
    {
      dataset: "orders",
      process: (data) =>
        data
          .filter(({ shipCountry }) => shipCountry === "Germany")
          .map(({ orderID, customerID, shipCountry }) => ({
            orderID,
            customerID,
            shipCountry,
          })),
    },

  // Get all orders placed in March 2025
  "SELECT orderID, customerID, orderDate FROM orders WHERE orderDate BETWEEN '2025-03-01' AND '2025-03-31';":
    {
      dataset: "orders",
      process: (data) =>
        data.filter(({ orderDate }) => {
          const date = new Date(orderDate);
          return (
            date >= new Date("2025-03-01") && date <= new Date("2025-03-31")
          );
        }),
    },

  // Get pending orders (shippedDate is NULL)
  "SELECT orderID, customerID, orderDate FROM orders WHERE shippedDate IS NULL;":
    {
      dataset: "orders",
      process: (data) =>
        data
          .filter(({ shippedDate }) => !shippedDate)
          .map(({ orderID, customerID, orderDate }) => ({
            orderID,
            customerID,
            orderDate,
          })),
    },

  "SELECT * FROM employees LIMIT 5;": {
    dataset: "employees",
    process: (data) => data.slice(0, 5),
  },
  "SELECT firstName, lastName, title FROM employees WHERE title LIKE '%Manager%';":
    {
      dataset: "employees",
      process: (data) =>
        data
          .filter(({ title }) => title?.toLowerCase().includes("manager")) // ✅ Case-insensitive check
          .map(({ firstName, lastName, title }) => ({
            firstName,
            lastName,
            title,
          })),
    },

  "SELECT COUNT(*) FROM employees;": {
    dataset: "employees",
    process: (data) => [{ count: data.length }],
  },
  "SELECT companyName, contactName FROM customers WHERE country = 'USA';": {
    dataset: "customers",
    process: (data) =>
      data
        .filter(({ country }) => country === "USA")
        .map(({ companyName, contactName }) => ({ companyName, contactName })),
  },
  "SELECT COUNT(*) FROM customers;": {
    dataset: "customers",
    process: (data) => [{ count: data.length }],
  },
  "SELECT * FROM customers ORDER BY customerID DESC LIMIT 10;": {
    dataset: "customers",
    process: (data) =>
      [...data].sort((a, b) => b.customerID - a.customerID).slice(0, 10),
  },
  "SELECT regionID, COUNT(*) FROM territories GROUP BY regionID;": {
    dataset: "territories",
    process: (data) => {
      const regionCount = {};
      data.forEach(({ regionID }) => {
        regionCount[regionID] = (regionCount[regionID] || 0) + 1;
      });
      return Object.entries(regionCount).map(([regionID, count]) => ({
        regionID,
        count,
      }));
    },
  },
  "SELECT COUNT(*) FROM territories;": {
    dataset: "territories",
    process: (data) => [{ count: data.length }],
  },
  "SELECT * FROM order_details LIMIT 5;": {
    dataset: "order_details",
    process: (data) => data.slice(0, 5),
  },

  // Count total order details
  "SELECT COUNT(*) FROM order_details;": {
    dataset: "order_details",
    process: (data) => [{ count: data.length }],
  },

  // Get all order details for a specific OrderID (e.g., 10248)
  "SELECT productID, unitPrice, quantity, discount FROM order_details WHERE orderID = 10248;":
    {
      dataset: "order_details",
      process: (data) =>
        data
          .filter(({ orderID }) => orderID === 10248)
          .map(({ productID, unitPrice, quantity, discount }) => ({
            productID,
            unitPrice,
            quantity,
            discount,
          })),
    },

  // Get total revenue per product
  "SELECT productID, SUM(unitPrice * quantity) AS totalRevenue FROM order_details GROUP BY productID;":
    {
      dataset: "order_details",
      process: (data) => {
        const revenueMap = {};
        data.forEach(({ productID, unitPrice, quantity }) => {
          revenueMap[productID] =
            (revenueMap[productID] || 0) + unitPrice * quantity;
        });
        return Object.entries(revenueMap).map(([productID, totalRevenue]) => ({
          productID,
          totalRevenue,
        }));
      },
    },

  // Get total discount given per product
  "SELECT productID, SUM(discount) AS totalDiscount FROM order_details GROUP BY productID;":
    {
      dataset: "order_details",
      process: (data) => {
        const discountMap = {};
        data.forEach(({ productID, discount }) => {
          discountMap[productID] = (discountMap[productID] || 0) + discount;
        });
        return Object.entries(discountMap).map(
          ([productID, totalDiscount]) => ({
            productID,
            totalDiscount,
          })
        );
      },
    },
};

export default function DataFetcher({ query }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("employees");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine dataset based on query
        const datasetToFetch =
          predefinedQueries[query]?.dataset || selectedDataset;
        setSelectedDataset(datasetToFetch);

        const response = await fetch(`/data/${datasetToFetch}.csv`);
        const text = await response.text();
        const parsedData = Papa.parse(text, { header: true }).data;

        console.log("Fetched Data:", parsedData);
        setData(parsedData);
        setFilteredData(parsedData);
      } catch (error) {
        console.error("Error loading CSV:", error);
      }
    };
    fetchData();
  }, [query, selectedDataset]); // ✅ Added selectedDataset

  useEffect(() => {
    if (!query.trim()) {
      setFilteredData(data);
      return;
    }

    console.log("Query entered:", query);

    try {
      let newData = [...data];

      if (predefinedQueries[query]) {
        // Use predefined query processing logic
        newData = predefinedQueries[query].process(data);
      } else {
        // Default fallback: Random subset (2-7 rows)
        newData.sort(() => Math.random() - 0.5);
        const randomCount = Math.min(
          Math.floor(Math.random() * 6) + 2,
          newData.length
        );
        newData = newData.slice(0, randomCount);
      }

      setFilteredData(newData);
    } catch (error) {
      console.error("Error processing query:", error);
      setFilteredData(data.slice(0, 2));
    }
  }, [query, data]);

  return (
    <div className={styles.dataFetcher}>
      <div className={styles.dataHeader}>
        <div className={styles.dataSet}>
          <label>Select Dataset:</label>
          <select onChange={(e) => setSelectedDataset(e.target.value)}>
            <option value="employees">Employees</option>
            <option value="customers">Customers</option>
            <option value="territories">Territories</option>
            <option value="orders">Orders</option>
            <option value="order_details">Order Details</option>
          </select>
        </div>
        <Link href="https://github.com/Ganeshshinde-2003/sql-editor-website" target="blank">
          <Image
            src="/github.png"
            alt="GITHUB LINK"
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>

      <h3>Output</h3>

      <DataTable data={filteredData} />
    </div>
  );
}
