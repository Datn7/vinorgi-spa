import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Model3D, ModelService } from '../../shared/model.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GlbViewerComponent } from '../glb-viewer/glb-viewer.component';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, GlbViewerComponent],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent implements OnInit {
  models: Model3D[] = [];
  selectedFile: File | null = null;

  constructor(
    private modelService: ModelService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.waitForTokenAndLoadModels();
  }

  private waitForTokenAndLoadModels(retries = 0): void {
    if (typeof window === 'undefined') {
      return;
    }

    const token = localStorage.getItem('auth_token');

    if (token) {
      this.fetchModels();
    } else if (retries < 5) {
      console.log(`Waiting for token... retry #${retries + 1}`);
      setTimeout(() => this.waitForTokenAndLoadModels(retries + 1), 500);
    } else {
      console.warn('Token not found after retries. Models not loaded.');
    }
  }

  private fetchModels(): void {
    this.modelService.getModels().subscribe({
      next: (models) => {
        this.models = models;
        console.log('Models loaded:', models);
        this.cdRef.detectChanges();
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
          this.selectedFile = null;
          this.fetchModels();
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert(`Upload failed: ${err.error?.message || 'Server error'}`);
        },
      });
  }

  deleteModel(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this model?');
    if (!confirmed) return;

    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('No auth token found. Please log in again.');
      return;
    }

    this.modelService.deleteModel(id).subscribe({
      next: () => {
        console.log(`Model ${id} deleted`);
        this.models = this.models.filter((model) => model.id !== id);
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert(`Delete failed: ${err.error?.message || 'Server error'}`);
      },
    });
  }
}
