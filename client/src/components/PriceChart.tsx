import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Brush } from 'recharts';
import { Card } from "@/components/ui/card";
import type { TimePeriod } from './TimePeriodTabs';

interface PriceDataPoint {
  timestamp: string;
  price: number;
  date: Date;
}

interface PriceChartProps {
  data: PriceDataPoint[];
  period: TimePeriod;
  isPositive: boolean;
}

// Custom tooltip component
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(data.price);

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm text-muted-foreground">{data.timestamp}</p>
        <p className="font-medium text-foreground">{formattedPrice}</p>
      </div>
    );
  }
  return null;
}

export default function PriceChart({ data, period, isPositive }: PriceChartProps) {
  const chartColor = isPositive ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-3))';
  
  // Enable zoom for periods longer than 1 day
  const enableZoom = period !== '1D';
  
  // Adjust chart height and margins based on whether zoom is enabled
  const chartHeight = enableZoom ? 'h-[480px]' : 'h-96';
  const bottomMargin = enableZoom ? 80 : 5;

  return (
    <Card className="p-6" data-testid="price-chart">
      <div className={`${chartHeight} w-full`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: bottomMargin }}>
            <XAxis 
              dataKey="timestamp" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin', 'dataMax']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => {
                return new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  notation: 'compact',
                  maximumFractionDigits: 1,
                }).format(value);
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: chartColor }}
            />
            {enableZoom && (
              <Brush 
                dataKey="timestamp"
                height={60}
                stroke={chartColor}
                fill="hsl(var(--muted))"
                tickFormatter={() => ''} // Hide brush ticks for cleaner look
                startIndex={0}
                endIndex={data.length - 1}
                onChange={(brushData) => {
                  console.log('Zoom range changed:', brushData);
                }}
              >
                <LineChart data={data}>
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={chartColor}
                    strokeWidth={1}
                    dot={false}
                  />
                </LineChart>
              </Brush>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {enableZoom && (
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Drag the selection area below to zoom into a specific time range
        </div>
      )}
    </Card>
  );
}