import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  onGetStarted(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.router.navigate(['/upload']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
