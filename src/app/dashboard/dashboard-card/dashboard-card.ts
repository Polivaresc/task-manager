import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css'
})
export class DashboardCard {
  @Input() props!: {
    label: string;
    count: number;
    color: 'text-rose-400' | 'text-emerald-400' | 'text-amber-400' | 'text-red-400';
  };
}
