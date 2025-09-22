const API_BASE_URL = 'http://localhost:8000';

interface PriceDataPoint {
  timestamp: string;
  price: number;
  date: string;
}

interface CurrentPriceResponse {
  price: number;
  percentage_change: number;
  currency: string;
  last_updated: string;
}

interface HistoricalDataResponse {
  data: PriceDataPoint[];
  period: string;
  current_price: number;
  percentage_change: number;
  data_points: number;
  last_updated: string;
}

// Fetch current Bitcoin price
export async function fetchCurrentPrice(): Promise<CurrentPriceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/btc/current`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching current price:', error);
    throw error;
  }
}

// Fetch historical Bitcoin price data for a specific period
export async function fetchHistoricalData(period: string): Promise<HistoricalDataResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/btc/history/${period}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching historical data for ${period}:`, error);
    throw error;
  }
}

// Transform API data to match frontend interface
export function transformApiData(apiData: PriceDataPoint[]): Array<{
  timestamp: string;
  price: number;
  date: Date;
}> {
  return apiData.map(point => ({
    timestamp: point.timestamp,
    price: point.price,
    date: new Date(point.date)
  }));
}

// Check API health
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}