import { useState } from 'react';
import { Range, Satisfaction } from '../api';
import { DateFilter, SatisfactionFilter } from './filters';
import { StatsGrid } from './stats';
import { OverallSatisfaction } from './satisfaction';
import { PatientList } from './patients';

export default function Dashboard() {
  const [range, setRange] = useState<Range>('all');
  const [satisfaction, setSatisfaction] = useState<Satisfaction | undefined>();
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Practice dashboard</h1>
      <DateFilter value={range} onChange={setRange} />
      <StatsGrid range={range} />
      <OverallSatisfaction range={range} />
      <p className="p-4 font-medium text-gray-700">Overall Patient Sentiment</p>
      <SatisfactionFilter value={satisfaction} onChange={setSatisfaction} />
      <PatientList range={range} satisfaction={satisfaction} />
    </div>
  );
}
