import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigate(['/models']),
        error: (err) => (this.error = 'Registration failed'),
      });

    console.log({
      username: this.username,
      email: this.email,
      password: this.password,
    });
  }
}
