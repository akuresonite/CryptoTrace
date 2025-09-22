import { Button } from "@/components/ui/button";

const TIME_PERIODS = [
  { id: '1D', label: '1 Day' },
  { id: '1W', label: '1 Week' },
  { id: '1M', label: '1 Month' },
  { id: '6M', label: '6 Months' },
  { id: '1Y', label: '1 Year' },
  { id: 'MAX', label: 'Max' },
] as const;

export type TimePeriod = typeof TIME_PERIODS[number]['id'];

interface TimePeriodTabsProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export default function TimePeriodTabs({ selectedPeriod, onPeriodChange }: TimePeriodTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" data-testid="time-period-tabs">
      {TIME_PERIODS.map((period) => (
        <Button
          key={period.id}
          variant={selectedPeriod === period.id ? "default" : "outline"}
          size="sm"
          onClick={() => {
            console.log(`Switching to ${period.label}`);
            onPeriodChange(period.id);
          }}
          data-testid={`button-period-${period.id.toLowerCase()}`}
          className="min-w-[60px]"
        >
          {period.id}
        </Button>
      ))}
    </div>
  );
}

export { TIME_PERIODS };