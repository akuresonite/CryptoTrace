import PriceDisplay from '../PriceDisplay';

export default function PriceDisplayExample() {
  // todo: remove mock functionality
  return (
    <div className="p-6">
      <PriceDisplay 
        currentPrice={4250000} 
        percentageChange={2.45}
      />
    </div>
  );
}