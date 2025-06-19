import { useQuery } from '@tanstack/react-query';
import { ReactComponent as NegativeIcon     } from '../../../assets/negative.svg';
import { ReactComponent as NeutralIcon } from '../../../assets/neutral.svg';
import { ReactComponent as PositiveIcon   } from '../../../assets/positive.svg';
import {api, Range, SatisfactionResponse} from "../../api";

interface Props {
    range: Range;
}

const Palette = ['bg-red-500','bg-yellow-400','bg-green-500'];

const Bar = ({ sum }: { sum: SatisfactionResponse }) => {
    const total = sum.positive + sum.neutral + sum.negative || 0;
    const parts = [sum.negative, sum.neutral, sum.positive];
    return (
        <div className="h-2 bg-gray-200 rounded overflow-hidden flex">
            {parts.map((v,i)=>(
                <div key={i} style={{width:`${(v/total)*100}%`}} className={Palette[i]}/>
            ))}
        </div>
    );
}

const Counters = ({ sum }: { sum: SatisfactionResponse }) => (
    <div className="mt-2 mb-3 flex justify-between items-center max-w-[240px] w-full mx-auto text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <NegativeIcon className="text-red-500" /> {sum.negative}
        </span>
            <span className="flex items-center gap-1">
          <NeutralIcon className="text-yellow-500" /> {sum.neutral}
        </span>
            <span className="flex items-center gap-1">
          <PositiveIcon className="text-green-500" /> {sum.positive}
        </span>
    </div>
);

export default function OverallSatisfaction({ range }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['satisfaction', range],
        queryFn: async () => {
            const [patients, employees] = await Promise.all([
                api
                    .get<{summary: SatisfactionResponse}>(`/patients/satisfaction?range=${range}`)
                    .then((r) => r.data.summary),
                api
                    .get<{summary: SatisfactionResponse}>(`/employees/satisfaction?range=${range}`)
                    .then((r) => r.data.summary),
            ]);

            return { patients, employees };
        },
    });

    if (isLoading) return <p>Loading satisfaction…</p>;
    if (isError || !data) return <p className="text-red-500">Error</p>;

    const Card = ({ title, sum }: { title: string; sum: SatisfactionResponse }) => (
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
            <Card title="Overall Employees Satisfaction" sum={data.employees}/>
            <Card title="Overall Patients Satisfaction"  sum={data.patients}/>
        </div>
    );
}
