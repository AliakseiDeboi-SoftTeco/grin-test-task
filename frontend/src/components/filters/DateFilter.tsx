import {Range} from "../../api";

interface Props {
    value: Range;
    onChange: (r: Range) => void;
}

const OPTIONS: { value: Range; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: '7d',    label: '7 days' },
    { value: '30d',   label: '30 days' },
    { value: 'all',   label: 'All time' },
];

export default function DateFilter({ value, onChange }: Props) {
    return (
        <div className="inline-flex gap-1 bg-gray-100 rounded-full p-1">
            {OPTIONS.map(({ value: v, label }) => (
                <button
                    key={v}
                    onClick={() => onChange(v)}
                    className={
                        'px-3 py-1 rounded-full text-xs font-medium ' +
                        (v === value ? 'bg-indigo-600 text-white' : 'text-gray-600')
                    }
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
