import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task-service';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {
  @Output() newTask = new EventEmitter<Task>();

  addTaskForm!: FormGroup;

  showForm: boolean = false;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  get title() {
    return this.addTaskForm.get('title');
  }

  get deadline() {
    return this.addTaskForm.get('deadline');
  }

  get priority() {
    return this.addTaskForm.get('priority');
  }
  
  get status() {
    return this.addTaskForm.get('status');
  }

  onSubmit() {
    if (this.addTaskForm.invalid) return;

    const newTask = this.addTaskForm.value;
  
    this.newTask.emit(newTask);

    this.addTaskForm.reset({ priority: 'medium', status: 'pending'});
    this.showForm = false;
  }
}
