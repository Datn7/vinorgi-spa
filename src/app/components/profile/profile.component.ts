import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ModelService } from '../../shared/model.service';
import { GlbViewerComponent } from "../glb-viewer/glb-viewer.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, GlbViewerComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any;
models: any[] = [];


  constructor(
    private router: Router,
    private authService: AuthService,
    private modelService: ModelService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          this.user = this.parseJwt(token);
        } catch (error) {
          console.error('Error decoding JWT', error);
        }
      }
    }

        this.user = this.authService.getCurrentUser();
    this.loadModels();
  }

  
  loadModels(): void {
    if (this.user?.id) {
      this.modelService.getModelsByUser(this.user.id).subscribe({
        next: (res) => this.models = res,
        error: (err) => console.error("Failed to load models", err)
      });
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('isLoggedIn');
      this.router.navigate(['/login']);
    }
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
  
}
