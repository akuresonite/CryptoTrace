import type { TimePeriod } from '@/components/TimePeriodTabs';

interface PriceDataPoint {
  timestamp: string;
  price: number;
  date: Date;
}

// todo: remove mock functionality
// Generate realistic BTC price data with some volatility
function generatePriceData(period: TimePeriod): PriceDataPoint[] {
  const basePrice = 4250000; // ₹42,50,000 base price
  const now = new Date();
  let dataPoints: PriceDataPoint[] = [];
  
  switch (period) {
    case '1D':
      // 24 hourly data points
      for (let i = 23; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000);
        const volatility = (Math.random() - 0.5) * 0.05; // ±2.5% volatility
        const price = basePrice * (1 + volatility + Math.sin(i / 4) * 0.02);
        dataPoints.push({
          timestamp: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          price: Math.round(price),
          date
        });
      }
      break;
      
    case '1W':
      // 7 daily data points
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const volatility = (Math.random() - 0.5) * 0.1; // ±5% volatility
        const trend = -0.02 + (6 - i) * 0.005; // slight upward trend
        const price = basePrice * (1 + volatility + trend);
        dataPoints.push({
          timestamp: date.toLocaleDateString('en-IN', { weekday: 'short' }),
          price: Math.round(price),
          date
        });
      }
      break;
      
    case '1M':
      // 30 daily data points
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const volatility = (Math.random() - 0.5) * 0.15; // ±7.5% volatility
        const trend = -0.05 + (29 - i) * 0.002; // gradual upward trend
        const price = basePrice * (1 + volatility + trend);
        dataPoints.push({
          timestamp: date.getDate().toString(),
          price: Math.round(price),
          date
        });
      }
      break;
      
    case '6M':
      // 26 weekly data points (approximately 6 months)
      for (let i = 25; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const volatility = (Math.random() - 0.5) * 0.2; // ±10% volatility
        const trend = -0.15 + (25 - i) * 0.008; // stronger upward trend
        const price = basePrice * (1 + volatility + trend);
        dataPoints.push({
          timestamp: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
          price: Math.round(price),
          date
        });
      }
      break;
      
    case '1Y':
      // 12 monthly data points
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const volatility = (Math.random() - 0.5) * 0.3; // ±15% volatility
        const trend = -0.3 + (11 - i) * 0.03; // significant growth over year
        const price = basePrice * (1 + volatility + trend);
        dataPoints.push({
          timestamp: date.toLocaleDateString('en-IN', { month: 'short' }),
          price: Math.round(price),
          date
        });
      }
      break;
      
    case 'MAX':
      // 5 yearly data points (representing BTC's major growth)
      const startYear = now.getFullYear() - 4;
      for (let i = 4; i >= 0; i--) {
        const date = new Date(startYear + (4 - i), 0, 1);
        const volatility = (Math.random() - 0.5) * 0.4; // ±20% volatility
        const exponentialGrowth = Math.pow(2, (4 - i) * 0.8); // exponential growth pattern
        const price = (basePrice / 8) * exponentialGrowth * (1 + volatility);
        dataPoints.push({
          timestamp: date.getFullYear().toString(),
          price: Math.round(price),
          date
        });
      }
      break;
  }
  
  return dataPoints;
}

// Calculate percentage change from first to last data point
export function calculatePercentageChange(data: PriceDataPoint[]): number {
  if (data.length < 2) return 0;
  const firstPrice = data[0].price;
  const lastPrice = data[data.length - 1].price;
  return ((lastPrice - firstPrice) / firstPrice) * 100;
}

// Get current price (last data point)
export function getCurrentPrice(data: PriceDataPoint[]): number {
  return data.length > 0 ? data[data.length - 1].price : 4250000;
}

export default generatePriceData;