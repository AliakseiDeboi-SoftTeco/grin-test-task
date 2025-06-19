import { Injectable } from '@nestjs/common';
import { parseISO, isWithinInterval } from 'date-fns';
import {CommunicationRepository} from "./communication.repository";
import {CommunicationQueryDTO} from "./dto/communication-query.dto";
import {getDateInterval} from "../common/utils/date-range";
import {CommunicationRO} from "./dto/communication.ro";

@Injectable()
export class CommunicationService {
    constructor(private readonly communicationRepository: CommunicationRepository) {}

    public findAll(dto: CommunicationQueryDTO): CommunicationRO {
        const base = this.communicationRepository.getCommunications();

        const { start, end } = getDateInterval(dto.range);
        let filtered = base.filter(lc =>
            isWithinInterval(parseISO(lc.createdAt), { start, end }),
        );

        if (dto.type) {
            filtered = filtered.filter(item => item.type === dto.type);
        }

        const total = filtered.length;

        const { page, limit } = dto;
        const offset = (page - 1) * limit;
        const items = filtered.slice(offset, offset + limit);

        return { total, items };
    }
}
