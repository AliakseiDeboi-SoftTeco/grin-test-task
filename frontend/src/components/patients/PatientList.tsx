import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PatientListItem from './PatientListItem';
import {fetchPage, Patient, Range, Satisfaction} from "../../api";

interface Props {
    range: Range;
    satisfaction?: Satisfaction;
    pageSize?: number;
}

export default function PatientList({ range, satisfaction, pageSize = 10 }: Props) {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<Patient[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setPage(1);
        setItems([]);
        setTotal(0);

        fetchPage<Patient>('/patients', 1, pageSize, {
            range,
            satisfaction,
        }).then((res) => {
            setItems(res.items ?? []);
            setTotal(res.total ?? 0);
        });
    }, [range, satisfaction, pageSize]);

    const loadMore = async () => {
        const nextPage = page + 1;

        const res = await fetchPage<Patient>('/patients', nextPage, pageSize, {
            range,
            satisfaction,
        });

        setItems((prev) => [...prev, ...res.items]);
        setPage(nextPage);
        setTotal(res.total);
    };

    const hasMore = items.length < total;

    if (!items.length) {
        return <p className="p-4 text-center">No patients found</p>;
    }

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<p className="p-4 text-center">Loading…</p>}
            endMessage={<p className="p-4 text-center text-gray-500">No more patients</p>}
        >
            <div className="bg-white rounded-2xl shadow divide-y">
                {items.map((p) => (
                    <PatientListItem key={p.id} item={p} />
                ))}
            </div>
        </InfiniteScroll>
    );
}
