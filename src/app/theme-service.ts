import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = signal(this.isDarkMode());  

  constructor() {
    this.updateHtml(this.darkMode());
  }

  updateHtml(isDark: boolean) {
    const html = document.documentElement;
    html.classList.toggle('dark', isDark);
  }

  toggleDarkMode() {
    const next = !this.darkMode();
    this.darkMode.set(next);
    this.updateHtml(next);
    localStorage.setItem('dark-mode', String(next));
  }

  isDarkMode(): boolean {
    return localStorage.getItem('dark-mode') === 'true';
  }

  chartLabelColor = computed(() => this.darkMode() ? '#f8fbfa' : '#1e2a3a');
  chartBorderColor = computed(() => this.darkMode() ? '#666b72ff' : '#d0d3d2ff');
}
