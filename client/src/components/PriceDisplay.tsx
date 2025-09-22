import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceDisplayProps {
  currentPrice: number;
  percentageChange: number;
  currency?: string;
}

export default function PriceDisplay({ 
  currentPrice, 
  percentageChange, 
  currency = "INR" 
}: PriceDisplayProps) {
  const isPositive = percentageChange >= 0;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(currentPrice);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4" data-testid="price-display">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold text-foreground" data-testid="text-current-price">
          {formattedPrice}
        </h1>
        <p className="text-sm text-muted-foreground">Bitcoin (BTC) to {currency}</p>
      </div>
      
      <div className={`flex items-center gap-1 px-3 py-1 rounded-md ${
        isPositive 
          ? 'bg-chart-2/10 text-chart-2' 
          : 'bg-chart-3/10 text-chart-3'
      }`} data-testid="price-change">
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span className="font-medium">
          {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}