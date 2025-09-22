import { useState, useEffect } from 'react';
import PriceDisplay from './PriceDisplay';
import TimePeriodTabs, { type TimePeriod } from './TimePeriodTabs';
import PriceChart from './PriceChart';
import ThemeToggle from './ThemeToggle';
import { fetchHistoricalData, transformApiData, checkApiHealth } from '@/services/btcApi';
import generatePriceData, { calculatePercentageChange, getCurrentPrice } from '@/utils/mockData';

export default function BitcoinChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1D');
  const [chartData, setChartData] = useState(() => generatePriceData('1D'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useApi, setUseApi] = useState(false);
  
  // Calculate derived values
  const currentPrice = getCurrentPrice(chartData);
  const percentageChange = calculatePercentageChange(chartData);
  const isPositive = percentageChange >= 0;

  // Check API availability on component mount
  useEffect(() => {
    const checkApi = async () => {
      try {
        const isHealthy = await checkApiHealth();
        if (isHealthy) {
          console.log('FastAPI backend is available, switching to API data');
          setUseApi(true);
        } else {
          console.log('FastAPI backend not available, using mock data');
          setUseApi(false);
        }
      } catch (error) {
        console.log('FastAPI backend not available, using mock data');
        setUseApi(false);
      }
    };
    checkApi();
  }, []);

  // Update chart data when period changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (useApi) {
          console.log(`Loading API data for period: ${selectedPeriod}`);
          const response = await fetchHistoricalData(selectedPeriod);
          const transformedData = transformApiData(response.data);
          setChartData(transformedData);
        } else {
          console.log(`Loading mock data for period: ${selectedPeriod}`);
          const newData = generatePriceData(selectedPeriod);
          setChartData(newData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data. Using fallback mock data.');
        // Fallback to mock data on error
        const newData = generatePriceData(selectedPeriod);
        setChartData(newData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedPeriod, useApi]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">Bitcoin Price Chart</h2>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* API Status Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${useApi ? 'bg-chart-2' : 'bg-muted-foreground'}`}></div>
              <span className="text-xs text-muted-foreground">
                {useApi ? 'FastAPI Backend' : 'Mock Data'}
              </span>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Price Display */}
          <PriceDisplay 
            currentPrice={currentPrice}
            percentageChange={percentageChange}
          />
          
          {/* Time Period Tabs */}
          <TimePeriodTabs 
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
          
          {/* Price Chart */}
          <PriceChart 
            data={chartData}
            period={selectedPeriod}
            isPositive={isPositive}
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-sm text-muted-foreground text-center">
            Last updated: {new Date().toLocaleString('en-IN')} • Demo data for illustration purposes
          </p>
        </div>
      </footer>
    </div>
  );
}