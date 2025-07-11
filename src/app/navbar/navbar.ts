import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  constructor (private auth: Auth) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  onLogout(): void {
    this.auth.logout();
  }

}
