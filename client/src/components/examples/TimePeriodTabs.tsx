import { useState } from 'react';
import TimePeriodTabs, { type TimePeriod } from '../TimePeriodTabs';

export default function TimePeriodTabsExample() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1D');

  return (
    <div className="p-6">
      <TimePeriodTabs 
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />
    </div>
  );
}