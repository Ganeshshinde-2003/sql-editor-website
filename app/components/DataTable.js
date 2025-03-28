"use client";
import { useState } from "react";
import styles from "../styles/dataTable.module.css";

export default function DataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  if (!data || data.length === 0) {
    return <p className={styles.noData}>No data available.</p>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className={styles.th}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className={styles.tr}>
                {Object.values(row).map((value, i) => (
                  <td key={i} className={styles.td}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show pagination only if data length > 15 */}
      {data.length > rowsPerPage && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
