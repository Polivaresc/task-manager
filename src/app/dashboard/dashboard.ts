import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  username: string | null = localStorage.getItem('username');

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Completed', 'In process', 'To Do'],
    datasets: [{
      data: [23, 55, 10]
    }]
  };
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Tasks by state'}
    }
  };


}
