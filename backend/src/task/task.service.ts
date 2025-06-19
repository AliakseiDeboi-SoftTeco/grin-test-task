import { Injectable } from '@nestjs/common';
import { parseISO, isWithinInterval } from 'date-fns';
import { TaskRepository } from './task.repository';
import { TaskQueryDTO } from './dto/task-query.dto';
import { getDateInterval } from '../common/utils/date-range';
import { TaskRO } from './dto/task.ro';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public findAll(dto: TaskQueryDTO): TaskRO {
    const base = this.taskRepository.getTasks();
    const { start, end } = getDateInterval(dto.range);
    let filtered = base.filter((lc) =>
      isWithinInterval(parseISO(lc.createdAt), { start, end }),
    );
    const total = filtered.length;

    const { page, limit } = dto;
    const offset = (page - 1) * limit;
    const items = filtered.slice(offset, offset + limit);

    return { total, items };
  }
}
