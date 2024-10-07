import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    //@Get()
    //getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //    if (Object.keys(filterDto).length) {
    //        return this.tasksService.getTasksWithFilters(filterDto);
    //    }
    //    return this.tasksService.getAllTasks();
    //}

    @Get('/:id')
    getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    //@Delete("/:id")
    //deleteTask(@Param("id") id: string): void {
    //    return this.tasksService.deleteTask(id);
    //}

    //@Patch("/:id/status")
    //updateTaskStatus(
    //    @Param("id") id: string,
    //    @Body("", TaskStatusValidationPipe) updateTaskStatusDto: UpdateTaskStatusDTO,
    //): Task {
    //    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
    //}
}
