import { useEffect, useState } from 'react';
import { ReactComponent as NegativeIcon } from '../../../assets/negative.svg';
import { ReactComponent as NeutralIcon } from '../../../assets/neutral.svg';
import { ReactComponent as PositiveIcon } from '../../../assets/positive.svg';
import { api, Range, SatisfactionResponse } from '../../api';

interface Props {
  range: Range;
}

const PALETTE = ['bg-red-500', 'bg-yellow-400', 'bg-green-500'];

const Bar = ({ sum }: { sum: SatisfactionResponse }) => {
  const total = sum.positive + sum.neutral + sum.negative || 1;
  const parts = [sum.negative, sum.neutral, sum.positive];
  return (
    <div className="h-2 bg-gray-200 rounded overflow-hidden flex">
      {parts.map((v, i) => (
        <div
          key={i}
          style={{ width: `${(v / total) * 100}%` }}
          className={PALETTE[i]}
        />
      ))}
    </div>
  );
};

const Counters = ({ sum }: { sum: SatisfactionResponse }) => (
  <div className="mt-2 mb-3 flex justify-between items-center max-w-[240px] w-full mx-auto text-xs text-gray-500">
    <span className="flex items-center gap-1">
      <NegativeIcon /> {sum.negative}
    </span>
    <span className="flex items-center gap-1">
      <NeutralIcon /> {sum.neutral}
    </span>
    <span className="flex items-center gap-1">
      <PositiveIcon /> {sum.positive}
    </span>
  </div>
);

export default function OverallSatisfaction({ range }: Props) {
  const [data, setData] = useState<{
    patients: SatisfactionResponse;
    employees: SatisfactionResponse;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      api
        .get<{
          summary: SatisfactionResponse;
        }>(`/patients/satisfaction?range=${range}`)
        .then((r) => r.data.summary),
      api
        .get<{
          summary: SatisfactionResponse;
        }>(`/employees/satisfaction?range=${range}`)
        .then((r) => r.data.summary),
    ])
      .then(([patients, employees]) => {
        setData({ patients, employees });
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError('Error');
        setLoading(false);
      });
  }, [range]);

  if (loading) return <p>Loading satisfaction…</p>;
  if (error || !data) return <p className="text-red-500">Error</p>;

  const Card = ({
    title,
    sum,
  }: {
    title: string;
    sum: SatisfactionResponse;
  }) => (
    <div className="card flex-1 min-w-[260px]">
      <h3 className="font-medium mb-2">{title}</h3>
      <Counters sum={sum} />
      <Bar sum={sum} />
      <p className="mt-3 text-xs text-gray-400">
        Emotions are mixed among {title.toLowerCase()}.
      </p>
    </div>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Overall Employees Satisfaction" sum={data.employees} />
      <Card title="Overall Patients Satisfaction" sum={data.patients} />
    </div>
  );
}
