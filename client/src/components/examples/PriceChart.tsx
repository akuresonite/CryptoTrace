import PriceChart from '../PriceChart';

export default function PriceChartExample() {
  // todo: remove mock functionality
  const mockData = [
    { timestamp: '00:00', price: 4200000, date: new Date() },
    { timestamp: '04:00', price: 4180000, date: new Date() },
    { timestamp: '08:00', price: 4220000, date: new Date() },
    { timestamp: '12:00', price: 4280000, date: new Date() },
    { timestamp: '16:00', price: 4250000, date: new Date() },
    { timestamp: '20:00', price: 4300000, date: new Date() },
    { timestamp: '24:00', price: 4250000, date: new Date() },
  ];

  return (
    <div className="p-6">
      <PriceChart 
        data={mockData}
        period="1D"
        isPositive={true}
      />
    </div>
  );
}