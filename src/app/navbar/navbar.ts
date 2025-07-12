import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
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

  constructor (private auth: Auth, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    })
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

}
