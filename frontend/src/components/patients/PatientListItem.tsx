import { format } from 'date-fns';
import {getInitials} from "../../utils/utils";
import {Patient} from "../../api";

interface Props {
    item: Patient
}

export default function PatientListItem({ item }: Props) {
    return (
        <div className="flex items-center gap-4 p-4 hover:bg-gray-50">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-medium">
                {getInitials(item.name)}
            </div>
            <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                    Last Communication Date {format(new Date(item.lastCommunicationDate), 'PP')}
                </p>
            </div>
        </div>
    );
}