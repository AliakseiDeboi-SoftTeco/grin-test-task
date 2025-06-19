import { useEffect, useState } from 'react';
import StatsTile from './StatsTile';

import { ReactComponent as MeetingIcon } from '../../../assets/meetingsIcon.svg';
import { ReactComponent as LikeIcon } from '../../../assets/likes.svg';
import { ReactComponent as TaskIcon } from '../../../assets/tasks.svg';
import { ReactComponent as BrushingIcon } from '../../../assets/brushing.svg';
import { ReactComponent as TimeSavedIcon } from '../../../assets/timesaved.svg';
import { ReactComponent as InstructionIcon } from '../../../assets/instructions.svg';
import { api, LiveCall, Paginated, Range } from '../../api';

interface Props {
  range: Range;
}

const fmt = (m: number) => `${Math.floor(m / 60)}h ${m % 60}m`;

const total = (url: string) =>
  api.get<{ total: number }>(url).then((r) => r.data.total);

export default function StatsGrid({ range }: Props) {
  const [data, setData] = useState<{
    meetings: number;
    brushings: number;
    instructions: number;
    likes: number;
    tasks: number;
    timeSaved: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      total(`/live-calls?range=${range}`),
      total(`/communications?range=${range}&type=brushing`),
      total(`/communications?range=${range}&type=instructions`),
      total(`/likes?range=${range}`),
      total(`/tasks?range=${range}`),
      api
        .get<
          Paginated<LiveCall> & { timeSaved: number }
        >(`/live-calls?range=${range}&page=1&limit=1`)
        .then((r) => r.data.timeSaved ?? 0),
    ])
      .then(([meetings, brushings, instructions, likes, tasks, timeSaved]) => {
        setData({ meetings, brushings, instructions, likes, tasks, timeSaved });
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError('Error');
        setLoading(false);
      });
  }, [range]);

  if (loading) return <p>Loading…</p>;
  if (error || !data) return <p className="text-red-500">Error</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatsTile
        icon={<MeetingIcon />}
        label="Meetings completed"
        value={data.meetings}
      />
      <StatsTile
        icon={<TaskIcon />}
        label="Tasks completed"
        value={data.tasks}
      />
      <StatsTile
        icon={<BrushingIcon />}
        label="Brushing"
        value={data.brushings}
      />
      <StatsTile icon={<LikeIcon />} label="Likes" value={data.likes} />
      <StatsTile
        icon={<TimeSavedIcon />}
        label="Time saved"
        value={fmt(data.timeSaved)}
      />
      <StatsTile
        icon={<InstructionIcon />}
        label="Instructions sent"
        value={data.instructions}
      />
    </div>
  );
}
