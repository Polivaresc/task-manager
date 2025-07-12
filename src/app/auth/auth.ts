import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly validUsername = 'admin';
  private readonly validPassword = '1234';

  incorrectUsername: boolean = false;
  incorrectPassword: boolean = false;

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      localStorage.setItem('token', 'admin-token');
      return true;
    }
    if (username !== this.validUsername) {
      this.incorrectUsername = true;
    }
    if (password !== this.validPassword) {
      this.incorrectPassword = true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
