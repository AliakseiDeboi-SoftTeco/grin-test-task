import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {CommunicationDTO} from "./dto/communication.dto";

@Injectable()
export class CommunicationRepository {
    private readonly communication: CommunicationDTO[];

    constructor() {
        const raw = readFileSync(
            join(__dirname, '..', '..', 'data', 'dataset.json'),
            'utf8',
        );
        this.communication = JSON.parse(raw).communication;
    }

    public getCommunications(): CommunicationDTO[] {
        return this.communication;
    }
}