# Financial Portfolio Dashboard

A modern React-based dashboard for tracking your investment portfolio with real-time stock performance charts and portfolio statistics.

## Features

- Light and dark mode with elegant transparent design
- Real-time portfolio value tracking
- Interactive stock performance charts
- Detailed holdings list with price changes
- Portfolio summary with key metrics
- Transaction history with advanced filtering
- Real-time stock chart viewer
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

- `src/components/` - React components
  - `Layout.tsx` - Main layout component with navigation
- `src/pages/` - Page components
  - `Overview.tsx` - Main dashboard with portfolio overview
  - `RealTimeChart.tsx` - Real-time stock chart viewer
  - `StockList.tsx` - Detailed stock holdings list
  - `TransactionHistory.tsx` - Transaction history with filters
- `src/theme.ts` - Theme configuration for light and dark modes
- `src/App.tsx` - Main application component with routing

## Technologies Used

- React
- TypeScript
- Material-UI
- Recharts
- React Router
- Date-fns

## Features in Detail

### Overview Page

- Total investment and growth rate
- Profitable transactions percentage
- Market fear index
- Portfolio distribution pie chart
- Portfolio growth line chart (monthly/quarterly/yearly)
- Current holdings list with mini charts

### Real-Time Chart Page

- Stock symbol search
- Real-time price chart
- Interactive tooltips
- Responsive design

### Stock List Page

- Detailed stock information
- Portfolio summary statistics
- Mini charts for each stock
- Performance metrics

### Transaction History Page

- Advanced filtering options
  - Transaction type
  - Value range
  - Date range
- Transaction summary statistics
- Detailed transaction list

## Note

This is a demo version with sample data. To integrate real stock data, you'll need to:

1. Sign up for a financial API service (e.g., Alpha Vantage, Yahoo Finance API)
2. Add your API key to the environment variables
3. Update the data fetching logic in the components

## License

MIT
