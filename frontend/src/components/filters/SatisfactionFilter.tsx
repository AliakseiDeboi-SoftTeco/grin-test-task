import { ReactComponent as NegativeIcon     } from '../../../assets/negative.svg';
import { ReactComponent as NeutralIcon } from '../../../assets/neutral.svg';
import { ReactComponent as PositiveIcon   } from '../../../assets/positive.svg';
import {Satisfaction} from "../../api";

interface Props {
    value: Satisfaction | undefined;
    onChange: (val: Satisfaction | undefined) => void;
}

const OPTIONS = [
    {
        key: 'negative',
        label: 'Can Be Better',
        color: 'bg-red-500',
        Icon: NegativeIcon,
    },
    {
        key: 'neutral',
        label: 'Neutral',
        color: 'bg-yellow-400',
        Icon: NeutralIcon
    },
    {
        key: 'positive',
        label: 'Positive',
        color: 'bg-green-500',
        Icon: PositiveIcon
    },
] as const;

export default function SatisfactionFilter({ value, onChange }: Props) {
    return (
        <div className="inline-flex gap-2">
            {OPTIONS.map(({ key, label, color, Icon }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={[
                        'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                        value === key ? `${color} text-white` : 'bg-gray-100 text-gray-600',
                    ].join(' ')}
                >
                    <Icon />
                    <span>{label}</span>
                </button>
            ))}

            <button
                onClick={() => onChange(undefined)}
                className={[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    value === undefined
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 bg-gray-100',
                ].join(' ')}
            >
                All
            </button>
        </div>
    );
}
