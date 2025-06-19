import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {LiveCallDTO} from "./dto/live-call.dto";

@Injectable()
export class LiveCallRepository {
    private readonly liveCalls: LiveCallDTO[];

    constructor() {
        const raw = readFileSync(
            join(__dirname, '..', '..', 'data', 'dataset.json'),
            'utf8',
        );
        this.liveCalls = JSON.parse(raw).liveCalls;
    }

    public getLiveCalls(): LiveCallDTO[] {
        return this.liveCalls;
    }
}