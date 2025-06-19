import { Inject, Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { DATASET } from '../common/data/data.provider';

@Injectable()
export class TaskRepository {
  constructor(
    @Inject(DATASET)
    private readonly dataset: { tasks: TaskDTO[] },
  ) {}

  getTasks(): TaskDTO[] {
    return this.dataset.tasks;
  }
}
