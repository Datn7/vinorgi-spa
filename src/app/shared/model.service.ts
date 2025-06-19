import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Model3D {
  id: number;
  fileUrl: string;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ModelService {
  private apiUrl = 'http://localhost:5151/api/models';

  constructor(private http: HttpClient) {}

  getModels() {
    return this.http.get<Model3D[]>(this.apiUrl);
  }
}
