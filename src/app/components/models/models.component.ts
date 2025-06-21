import { Component } from '@angular/core';
import { Model3D, ModelService } from '../../shared/model.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-models',
  imports: [FormsModule, CommonModule],
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss',
})
export class ModelsComponent {
  models: Model3D[] = [];
  selectedFile!: File | null;

  constructor(private modelService: ModelService, private http: HttpClient) {}

  ngOnInit() {
    this.modelService.getModels().subscribe({
      next: (models) => (this.models = models),
      error: (err) => console.error('Failed to fetch models', err),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadModel(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const token = localStorage.getItem('token'); // or 'auth_token' if you're using that key

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
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert('Upload failed: ' + (err.error || 'Server error'));
        },
      });
  }
}
