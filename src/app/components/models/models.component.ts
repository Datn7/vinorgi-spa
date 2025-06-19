import { Component } from '@angular/core';
import { Model3D, ModelService } from '../../shared/model.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-models',
  imports: [FormsModule, CommonModule],
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss',
})
export class ModelsComponent {
  models: Model3D[] = [];

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.modelService.getModels().subscribe({
      next: (models) => (this.models = models),
      error: (err) => console.error('Failed to fetch models', err),
    });
  }
}
