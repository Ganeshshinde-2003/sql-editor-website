# Atlan SQL Query Runner

## Overview
This project is a web-based SQL Query Runner that allows users to input SQL queries and display corresponding tabular results. The application is built with Next.js and React and follows the given assessment guidelines.

## Tech Stack
- **Framework:** Next.js 15.2.4 (App Router Structure)
- **UI Library:** None (Styled using standard CSS)
- **Packages Used:**
  - `papaparse`: To handle CSV parsing for mock data rendering.
  - `eslint`: Code quality and linting.

## Features
- **SQL Query Input:** A text area to input SQL queries.
- **Predefined Queries & Tables:** Users can toggle between multiple predefined queries and their corresponding tables.
- **Data Display:** Queries return tabular data (mock data, not actual SQL execution).
- **CSV Import:** Users can upload CSV files, and the table updates accordingly.
- **Performance Optimizations:** Efficient rendering of large datasets without browser crashes.

## Folder Structure
```
/atlan
│-- app/        # Next.js App Router structure
│   │-- layout.tsx  # Layout components
│   │-- page.tsx    # Main page handling query input and table rendering
│-- components/  # Reusable components
│   │-- DataTable.tsx  # Table component for displaying query results
│-- public/      # Static assets
│-- styles/      # CSS files for styling
│-- utils/       # Helper functions
│-- package.json # Project dependencies
│-- README.md    # Project documentation
```

## Load Time & Optimizations
- **Page Load Time:** ~1.2s (measured using Chrome DevTools Lighthouse)
- **Optimizations Implemented:**
  - Client-side rendering for fast interactions.
  - Virtualized table rendering for large datasets.
  - Lazy loading for improved performance.

## Deployment
- The project is deployed on **Vercel**.
- Live Demo: [Insert Link Here]
- GitHub Repo: [Insert Link Here]

## Video Walkthrough
- A demo video showcasing features, system design, and challenges faced is available at: [Insert Link Here]

## Challenges & Learnings
- **Handling Large Datasets:** Used virtualization to avoid performance issues.
- **Optimizing UI Rendering:** Memoization and efficient state management were used.
- **Ensuring Accessibility:** Improved usability with proper focus states and keyboard navigation.

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone [repo-link]
   cd atlan
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open in the browser: `http://localhost:3000`
