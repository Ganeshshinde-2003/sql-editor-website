"use client";
import { useState } from "react";
import QueryInput from "./components/QueryInput";
import DataFetcher from "./components/DataFetcher";
import styles from "./styles/home.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [executedQuery, setExecutedQuery] = useState("");

  const handleRunQuery = (query) => {
    setExecutedQuery(query); // Store executed query
  };

  return (
    <div className={styles.container}>
      <QueryInput onQueryChange={setQuery} onRunQuery={handleRunQuery} />
      <DataFetcher query={executedQuery} />
    </div>
  );
}
