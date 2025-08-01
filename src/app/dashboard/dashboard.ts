import { Component, effect } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { Priority, Status, Task } from '../task';

import { TaskService } from '../task-service';
import { DashboardCard } from "./dashboard-card/dashboard-card";
import { ThemeService } from '../theme-service';

@Component({
  selector: 'app-dashboard',
  imports: [NgChartsModule, DashboardCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  username: string | null = localStorage.getItem('username');
  tasks: Task[] = [];

  pieChartData!: ChartConfiguration<'pie'>['data'];
  pieChartOptions: ChartOptions<'pie'> = {};

  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'> = {};
  

  constructor(
    private taskService: TaskService,
    private themeService: ThemeService
  ) {
    effect(() => {
      console.log(this.themeService.darkMode())
      this.taskService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks
          this.getPieChartData();
          this.getPieChartOptions();
          this.getLineChartData();
          this.getLineChatOptions();
        }
        );
    });
  };

  tasksByStatus(status: Status): number {
    const tasksByStatus: Task[] = this.tasks.filter(task => task.status === status);
    return tasksByStatus.length;
  }

  tasksByPriority(priority: Priority): number {
    const tasksByPriority: Task[] = this.tasks.filter(task => task.priority === priority);
    return tasksByPriority.length;
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

  get mediumTasks(): number {
    return this.tasksByPriority('medium');
  }

  get highTasks(): number {
    return this.tasksByPriority('high');
  }

  get urgentTasks(): number {
    return this.tasksByPriority('urgent');
  }

  get overdueTasks(): number {
    const now = new Date();
    const overdueTasks = this.tasks.filter(
      task => task.status !== 'done' && new Date(task.deadline) < now
    );
    return overdueTasks.length;
  }

  getPieChartData() {
    this.pieChartData = {
    labels: ['Pending', 'In progress', 'Done'],
    datasets: [{
      data: [this.pendingTasks, this.inProgressTasks, this.completedTasks],
      backgroundColor: ['#fea6d6' , '#a3b3ff', '#6be4d1'],
    }]
    };
  }

  getPieChartOptions() {
    this.pieChartOptions = {
      responsive: true,
      plugins: { legend: { labels: { color: this.themeService.chartLabelColor() } } }
    }
  }

  getLineChatOptions() {
    this.lineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: this.themeService.chartLabelColor()
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
            color: this.themeService.chartLabelColor()
          },
          ticks: {
            color: this.themeService.chartLabelColor()
          },
          grid: {
            color: this.themeService.chartBorderColor()
          }
        },
        y: {
          title: {
            display: true,
            text: 'Tasks',
            color: this.themeService.chartLabelColor()
          },
          ticks: {
            color: this.themeService.chartLabelColor()
          },
          grid: {
            color: this.themeService.chartBorderColor()
          },
          beginAtZero: true
        }
      }
    }
  }

  getLineChartData() {
    const tasksByDate: { [date: string]: number } = {};

    for (let task of this.tasks) {
      const dateKey = new Date(task.deadline).toLocaleDateString();
      tasksByDate[dateKey] = (tasksByDate[dateKey] || 0) + 1;
    }

    const sortedDates = Object.keys(tasksByDate).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    this.lineChartData = {
      labels: sortedDates,
      datasets: [{
        label: 'Tasks',
        data: sortedDates.map(date => tasksByDate[date]),
        backgroundColor: '#53eafd',
        borderColor: '#53eafd',
        pointBackgroundColor: '#fea6d6',
        pointBorderColor: '#fea6d6',
        tension: 0.4
      }]
    }
  }
}
