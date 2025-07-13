import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task-service';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks: Task[] = [];

  constructor (private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

}
