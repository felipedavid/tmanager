import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any) {
        let {status} = value;

        value.status = value.status.toUpperCase();

        if (!this.isStatusValid(status)) {
            throw new BadRequestException(`"${status}" is a invalid status`);
        }

        return value; 
    }

    private isStatusValid(status: any): boolean {
        return this.allowedStatuses.indexOf(status) !== -1
    }
}