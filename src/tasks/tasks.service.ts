import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [

    ];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status == status);
        }

        if (search) {
            tasks = tasks.filter(task => {
                return task.title.includes(search) || task.description.includes(search);
            });
        }

        return tasks;
    }

    getTaskByID(id: string): Task {
        const found = this.tasks.find(task => task.id === id)
        
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDTO): Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskByID(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id)
    }

    updateTaskStatus(id: string, updateTaskStatus: UpdateTaskStatusDTO): Task {
        const task = this.getTaskByID(id);

        task.status = updateTaskStatus.status;

        return task;
    }
}
