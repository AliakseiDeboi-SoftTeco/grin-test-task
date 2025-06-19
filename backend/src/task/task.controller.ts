import { Controller, Get, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskQueryDTO } from './dto/task-query.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public findAll(@Query() query: TaskQueryDTO) {
    return this.taskService.findAll(query);
  }
}
