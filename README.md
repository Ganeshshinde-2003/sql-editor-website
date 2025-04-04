# Atlan SQL Query Runner

## Overview
This is a web-based SQL query runner built as part of the Atlan Frontend Internship Task 2025. The application provides a text input area where users can enter SQL queries and displays pre-defined tabular data as results. The app is built using Next.js (App Router) and React.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Frontend Library:** React 19
- **Data Handling:** PapaParse (for CSV parsing)
- **Styling:** CSS (No Tailwind, as per guidelines)

## Features
- Input field for SQL queries.
- Predefined dataset displayed in a table format.
- Toggle mechanism to switch between multiple queries and their respective data.
- Responsive and minimal UI.

## How It Works
- User enters an SQL-like query in the input field.
- The app matches the query with a predefined dataset.
- The relevant dataset is displayed in a paginated table.
- Users can toggle between different queries.
- No actual SQL execution is performed; data is purely static.

## Folder Structure
```
📦 app
 ┣ 📂 components
 ┃ ┣ 📜 DataFetcher.js
 ┃ ┣ 📜 DataTable.js
 ┃ ┣ 📜 QueryInput.js
 ┣ 📂 styles
 ┃ ┣ 📜 home.module.css
 ┃ ┣ 📜 queryInput.module.css
 ┣ 📜 page.js
 ┣ 📜 layout.js
 ┣ 📜 global.css
```

## Installation and Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Ganeshshinde-2003/sql-editor-website
   cd atlan
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Performance Optimizations
- Used Next.js App Router for better performance and server-side rendering.
- Optimized table rendering to handle large datasets efficiently.

## Page Load Time
- Page load time was tested using Chrome DevTools.
- Initial load time: ~1.2s (Measured via Performance tab in DevTools).

## Deployment
The app is deployed on **Vercel**. You can access it here: [https://sql-editor-website.vercel.app/](https://sql-editor-website.vercel.app/)

## Video Walkthrough
A walkthrough video explaining the app features and technical decisions is available [here](https://www.loom.com/share/952ed58d2b484018879f14e7163ee635?sid=0075a702-ef0f-4625-9aae-3edbdbfcf7ce).

## Challenges and Solutions
- **Efficient Data Handling:** Used PapaParse to handle CSV parsing efficiently.
- **Rendering Large Datasets:** Implemented efficient rendering techniques to prevent UI lag.

## Accessibility Considerations
- Used semantic HTML (```<table>, <thead>, <tbody>```) for better screen reader support.
- Followed contrast & readability best practices for UI.


## External Libraries Used
- `papaparse` (CSV Parsing)
- `react` and `next`

## Future Enhancements
- Implement a syntax highlighter for SQL queries.
- Add support for more predefined datasets.
