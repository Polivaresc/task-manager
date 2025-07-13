import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TASKS } from './mock-tasks';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryData implements InMemoryDbService {

  createDb() {
    const tasks = TASKS;
    return { tasks };
  }

  genId(tasks: Task[]): number {
    const ids = tasks.map(task => task.id)
      .filter((id): id is number => id !== undefined);

    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }
  
}
