import { Component } from '@angular/core';
import { Model3D, ModelService } from '../../shared/model.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss',
})
export class ModelsComponent {
  models: Model3D[] = [];
  selectedFile!: File | null;

  constructor(private modelService: ModelService, private http: HttpClient) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.tryLoadModels(0);
      }
    }
  }

  tryLoadModels(attempts: number) {
    const token = localStorage.getItem('auth_token');

    if (token) {
      this.fetchModels();
    } else if (attempts < 5) {
      console.log(`No token found. Retrying (${attempts + 1}/5)...`);
      setTimeout(() => this.tryLoadModels(attempts + 1), 500);
    } else {
      console.warn('Token not found after retries. Models not loaded.');
    }
  }

  fetchModels() {
    this.modelService.getModels().subscribe({
      next: (models) => {
        this.models = models;
        console.log('Models loaded:', models);
        // ✅ NO NEED for ChangeDetectorRef anymore
      },
      error: (err) => {
        console.error('Failed to fetch models', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadModel(): void {
    if (!this.selectedFile) {
      alert('Please select a .glb file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('No auth token found. Please log in again.');
      return;
    }

    this.http
      .post<any>('http://localhost:5151/api/models/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (res) => {
          console.log('Upload successful', res);
          alert('Model uploaded!');
          this.fetchModels();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert(`Upload failed: ${err.error?.message || 'Server error'}`);
        },
      });
  }
}
