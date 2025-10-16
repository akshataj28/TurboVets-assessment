import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../core/api';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="email" name="email" placeholder="Email" style="width: 240px;" />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" style="width: 240px; margin-left: 8px;" />
      <button style="margin-left: 8px;">Login</button>
    </form>
  </div>

  <div class="card">
    <h3>Or Register</h3>
    <form (ngSubmit)="register()">
      <input [(ngModel)]="email" name="email2" placeholder="Email" style="width: 240px;" />
      <input [(ngModel)]="password" name="password2" type="password" placeholder="Password" style="width: 240px; margin-left: 8px;" />
      <select [(ngModel)]="role" name="role" style="margin-left: 8px;">
        <option>USER</option><option>MANAGER</option><option>ADMIN</option>
      </select>
      <button style="margin-left: 8px;">Register</button>
    </form>
  </div>
  `
})
export class LoginComponent {
  email: string = 'admin@example.com';
  password: string = 'password';
  role: 'USER'|'MANAGER'|'ADMIN' = 'USER';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>(`${API_URL}/auth/login`, { email: this.email, password: this.password })
      .subscribe({
        next: r => { localStorage.setItem('token', r.access_token); this.router.navigateByUrl('/'); },
        error: err => alert(err?.error?.message ?? 'Login failed')
      });
  }

  register() {
    this.http.post<any>(`${API_URL}/auth/register`, { email: this.email, password: this.password, role: this.role })
      .subscribe({
        next: r => { localStorage.setItem('token', r.access_token); this.router.navigateByUrl('/'); },
        error: err => alert(err?.error?.message ?? 'Register failed')
      });
  }
}
