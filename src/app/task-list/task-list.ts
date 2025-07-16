import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Priority, Status, Task } from '../task';
import { TaskService } from '../task-service';
import { AddTask } from '../add-task/add-task';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule, FormsModule, DatePipe, AddTask],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks: Task[] = [];

  expandedDescriptions: Set<number> = new Set();

  constructor (private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  get finishedTasks() {
    return this.tasks.filter(task => task.status === 'done');
  }

  get unfinishedTasks() {
    return this.tasks.filter(task => task.status !== 'done');
  }

  toggleDescription(taskId: number) {
    if (this.expandedDescriptions.has(taskId)) {
      this.expandedDescriptions.delete(taskId);
    } else {
      this.expandedDescriptions.add(taskId);
    }
  }

  isExpanded(taskId: number): boolean {
    return this.expandedDescriptions.has(taskId);
  }

  // CRUD

  createTask(task: Task) {
    this.taskService.addTask(task).subscribe(newTask => {
      this.tasks.push(newTask);
    })
  }

  updateDescription(task: Task, description: string) {
    task.description = description;
    this.taskService.updateTask(task).subscribe();
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
