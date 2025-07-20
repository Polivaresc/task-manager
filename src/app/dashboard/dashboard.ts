import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Priority, Status, Task } from '../task';
import { TaskService } from '../task-service';
import { DashboardCard } from "./dashboard-card/dashboard-card";

@Component({
  selector: 'app-dashboard',
  imports: [NgChartsModule, DashboardCard],
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

  get labelColor() {
    return localStorage.getItem('dark-mode') ? '#f8fbfa' : '#1e2a3a';
  }

  get chartBorderColor() {
    return localStorage.getItem('dark-mode') ? '#f8fbfa' : '#1e2a3a';
  }


  pieChartData!: ChartConfiguration<'pie'>['data'];
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: this.labelColor
        }
      }
    }
  };

  getPieChartData() {
    const chartColors = ['#fea6d6' , '#a3b3ff', '#6be4d1'];

    this.pieChartData = {
    labels: ['Pending', 'In progress', 'Done'],
    datasets: [{
      data: [this.pendingTasks, this.inProgressTasks, this.completedTasks],
      backgroundColor: chartColors,
      borderColor: this.chartBorderColor
    }]
    };
  }

  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { 
        display: true, 
        position: 'top',
        labels: {
          color: this.labelColor
        }
      }
    },
    scales: {
      x: {
        title: { 
          display: true, 
          text: 'Date',
          color: this.labelColor
        },
        ticks: {
          color: this.labelColor
        },
        grid: {
          color: '#6a7281'
        }
      },
      y: {
        title: { 
          display: true, 
          text: 'Tasks',
          color: this.labelColor
        },
        ticks: {
          color: this.labelColor
        },
        grid: {
          color: '#6a7281'
        },
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
