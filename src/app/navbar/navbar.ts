import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Auth } from '../auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() title?: string;

  isLoggedIn: boolean = false;
  darkMode: boolean = false;

  constructor (private auth: Auth, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    })
  }

  get currentRoute() {
    return this.activatedRoute;
  }

  ngOnInit(): void {
    this.checkLoginStatus();

    const prefersDarkMode = localStorage.getItem('dark-mode');
    if (prefersDarkMode) {
      this.darkMode = true;
      document.documentElement.classList.add('dark');
    }
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

    const html = document.documentElement;
    if (this.darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('dark-mode', this.darkMode.toString());
  }

}
