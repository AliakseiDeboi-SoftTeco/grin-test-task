import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {TaskDTO} from "./dto/task.dto";

@Injectable()
export class TaskRepository {
    private readonly tasks: TaskDTO[];

    constructor() {
        const raw = readFileSync(
            join(__dirname, '..', '..', 'data', 'dataset.json'),
            'utf8',
        );
        this.tasks = JSON.parse(raw).tasks;
    }

    getTasks(): TaskDTO[] {
        return this.tasks;
    }
}