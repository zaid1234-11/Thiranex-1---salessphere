# Contributing to SalesSphere

First off, thank you for considering contributing to SalesSphere! 

## Philosophy
SalesSphere is designed as an architectural showcase. Therefore, any contributions must adhere to the core principles outlined in `DECISIONS.md`. 
Specifically:
1. **Performance First:** No PR will be accepted that significantly bloats the initial bundle size without overwhelming justification.
2. **Separation of Concerns:** UI components must not contain data-fetching logic. Use the Repository layer.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/salessphere.git
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run ETL Pipeline** (Required if modifying dataset logic)
   ```bash
   npm run process-data
   ```
4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Pull Request Process

1. Ensure your code strictly adheres to the existing Tailwind and Motion system tokens.
2. If you add a new data dependency, you must update the ETL pipeline. Do not fetch raw CSVs in the browser.
3. Update the `CHANGELOG.md`.
4. Submit your PR for review.
