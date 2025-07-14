import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Priority, Status, Task } from '../task';
import { TaskService } from '../task-service';

@Component({
  selector: 'app-dashboard',
  imports: [NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  username: string | null = localStorage.getItem('username');
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks
        this.getPieChartData();
        this.getLineChartData();
      });
  };

  tasksByStatus(status: Status): number {
    const tasksByStatus: Task[] | undefined = this.tasks.filter(task => task.status === status);
    if (tasksByStatus === undefined) {
      return 0;
    }
    return tasksByStatus.length;
  }

  get pendingTasks(): number {
    return this.tasksByStatus('pending');
  }

  get completedTasks(): number {
    return this.tasksByStatus('done');
  }

  get inProgressTasks(): number {
    return this.tasksByStatus('in-progress');
  }

  tasksByPriority(priority: Priority): number {
    const tasksByPriority: Task[] | undefined = this.tasks.filter(task => task.priority === priority);
    if (tasksByPriority === undefined) {
      return 0;
    }
    return tasksByPriority.length;
  }

  get mediumTasks(): number {
    return this.tasksByPriority('medium');
  }

  get highTasks(): number {
    return this.tasksByPriority('high');
  }

  get urgentTasks(): number {
    return this.tasksByPriority('urgent');
  }

  pieChartData!: ChartConfiguration<'pie'>['data'];
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Tasks by status'}
    }
  };

  getPieChartData() {
    this.pieChartData = {
    labels: ['Pending', 'In progress', 'Done'],
    datasets: [{
      data: [this.pendingTasks, this.inProgressTasks, this.completedTasks]
    }]
    };
  }

  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { 
        display: true, 
        position: 'top'
      },
      title: { 
        display: true, 
        text: 'Tasks by deadline'
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Date'}
      },
      y: {
        title: { display: true, text: 'Tasks'},
        beginAtZero: true
      }
    }
  };

  getLineChartData() {
    const tasksByDate: { [date: string]: number } = {};

    for (let task of this.tasks) {
      const dateKey = new Date(task.deadline).toLocaleDateString();
      tasksByDate[dateKey] = (tasksByDate[dateKey] || 0) + 1;
    }

    const sortedDates = Object.keys(tasksByDate).sort(
      (a, b) => new Date(a).getDate() - new Date(b).getDate()
    );

    this.lineChartData = {
      labels: sortedDates,
      datasets: [{
        label: 'Tasks',
        data: sortedDates.map(date => tasksByDate[date]),
        borderColor: 'cyan',
        fill: false,
        tension: 0.4
      }]
    }
  }


}
