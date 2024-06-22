import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  createTask(@Body() body: { title: string; description: string }) {
    const task = this.tasksService.createTask(body.title, body.description);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Task created!',
      data: task,
    };
  }

  @Get()
  getAllTasks() {
    const tasks = this.tasksService.getAllTasks();

    return {
      statusCode: HttpStatus.OK,
      message: 'All the tasks',
      data: tasks,
    };
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'All the tasks',
      data: task,
    };
  }
}
