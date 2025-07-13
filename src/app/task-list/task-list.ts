import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Priority, Status, Task } from '../task';
import { TaskService } from '../task-service';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule, FormsModule, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks: Task[] = [];

  constructor (private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  updateDeadline(task: Task, date: string) {
    task.deadline = new Date(date);
    this.taskService.updateTask(task).subscribe();
  }

  updatePriority(task: Task, priority: Priority) {
    task.priority = priority;
    this.taskService.updateTask(task).subscribe();
  }

  updateStatus(task: Task, status: Status) {
    task.status = status;
    this.taskService.updateTask(task).subscribe();
  }

  confirmDelete(task: Task) {
    const confirmed = window.confirm('Do you want to delete this task?');
    if (confirmed) {
      this.delete(task);
    }
  }
  
  delete(task: Task) {
    if (task && task.id !== undefined) {
      this.tasks = this.tasks.filter(t => t !== task);
      this.taskService.deleteTask(task.id).subscribe();
    }
  }

}
