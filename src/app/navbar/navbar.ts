import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Auth } from '../auth/auth';
import { ThemeService } from '../theme-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() title?: string;

  isLoggedIn: boolean = false;

  constructor (
    private auth: Auth, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  get currentRoute() {
    return this.activatedRoute;
  }

  get isDarkMode() {
    return this.themeService.isDarkMode();
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

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
}
